import {
  type Client,
  GatewayDispatchEvents,
  type GatewayGuildMemberAddDispatchData,
  type GatewayInviteCreateDispatchData,
  type GatewayInviteDeleteDispatchData,
  type GatewayReadyDispatchData,
  type WithIntrinsicProps,
} from '@discordjs/core';
import { promiseTimeout } from '@vueuse/shared';
import { toCachedInvite, toCachedUser } from '~/utils/invites';
import { type CachedInviteData, type CachedUser } from '~/types/invites';
import { InviteRepository } from '~/repository/invite_repository';
import { logger } from '~/utils/logger';

export class InviteMonitor {
  private botUser: CachedUser = {
    username: 'LastInviteMgr',
    id: '',
  };
  private readonly repository = new InviteRepository();

  constructor(
    private readonly client: Client,
    private readonly config: { token: string; guildId: string; roleId: string },
  ) {}

  setupListeners() {
    this.client.once(GatewayDispatchEvents.Ready, (payload) =>
      this.onReady(payload),
    );
    this.client.on(GatewayDispatchEvents.GuildMemberAdd, (payload) =>
      this.onJoin(payload),
    );
    this.client.on(GatewayDispatchEvents.InviteCreate, (payload) =>
      this.onInviteCreated(payload),
    );
    this.client.on(GatewayDispatchEvents.InviteDelete, (payload) =>
      this.onInviteDeleted(payload),
    );
  }

  private async onReady({
    api,
    data,
  }: WithIntrinsicProps<GatewayReadyDispatchData>) {
    logger.info('Gateway connection ready');
    await promiseTimeout(1000);
    const guildInvites = await api.guilds.getInvites(this.config.guildId);

    for (const guildInvite of guildInvites) {
      await this.repository.set(toCachedInvite(guildInvite));
    }

    this.botUser = toCachedUser(data.user);

    logger.debug(
      `${this.botUser.username}: found ${guildInvites.length} known invites to monitor`,
    );
  }

  private async onJoin(
    payload: WithIntrinsicProps<GatewayGuildMemberAddDispatchData>,
  ) {
    const user = payload.data.user;
    if (!user) {
      logger.info('Missing user information, bailing.');
      return;
    }
    const guildId = payload.data.guild_id;
    const member: CachedUser = toCachedUser(user);

    logger.debug(`A new user with id ${member.id} (${member.username}) joined`);

    const apiInvites = await payload.api.guilds.getInvites(guildId);
    const invites: Record<string, CachedInviteData> = {};
    for (const invite of apiInvites) {
      const { code, data } = toCachedInvite(invite);
      invites[code] = data;
    }

    for await (const [code, data] of this.repository.iterator()) {
      const invite = invites[code];
      if (!invite) {
        continue;
      }

      if (invite.uses > data.uses && invite.inviter?.id !== this.botUser.id) {
        await this.repository.set({ code, data: invite });
        logger.debug(
          `Invite id ${code} was used, that is not guaranteed to have a captcha, bailing`,
        );
        return;
      }
    }

    const roleId = this.config.roleId;
    logger.debug(
      `User ${member.username} joined, preparing to add role ${roleId}`,
    );
    await payload.api.guilds.addRoleToMember(guildId, member.id, roleId);
  }

  private async onInviteCreated({
    data,
  }: WithIntrinsicProps<GatewayInviteCreateDispatchData>) {
    logger.info(`Invite ${data.code} was created by ${data.inviter?.username}`);

    await this.repository.set(toCachedInvite(data));
  }

  private async onInviteDeleted({
    data,
  }: WithIntrinsicProps<GatewayInviteDeleteDispatchData>) {
    logger.info(`Invite ${data.code} was deleted`);
    await this.repository.delete(data.code);
  }
}

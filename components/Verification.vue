<script setup lang="ts">
import { get, set } from '@vueuse/core';
import { type DiscordInvite, DiscordInviteResponse } from '~/types/discord';

const { t } = useI18n();

const valid = ref(true);
const invite = ref<DiscordInvite>();
const error = ref();

const inviteLink = computed(() => {
  if (!isDefined(invite)) {
    return null;
  }
  return `https://discord.com/invite/${get(invite).code}`;
});

const expiry = computed(() => {
  if (!isDefined(invite)) {
    return null;
  }
  return get(invite, 'expires_at');
});

const { onSuccess, onError, onExpired, captchaId, resetCaptcha } =
  useRecaptcha();

const onCaptchaSuccess = async (token: string) => {
  onSuccess(token);

  try {
    const response = await useFetch('/_api/discord_invite', {
      method: 'POST',
      body: {
        captcha: token,
      },
    });
    set(invite, DiscordInviteResponse.parse(get(response.data)));
  } catch (e: any) {
    resetCaptcha();
    set(error, e.message);
    set(invite, undefined);
  }
};
</script>

<template>
  <div class="container">
    <div
      class="md:h-[294px] py-[5rem] flex flex-row items-center justify-between flex-wrap"
    >
      <div class="basis-full md:basis-auto">
        <div class="text-h6 text-rui-black">{{ t('discord.chat') }}</div>
        <div class="text-h4 mt-[0.75rem]">{{ t('discord.title') }}</div>

        <div v-show="!inviteLink">
          {{ t('discord.description') }}
        </div>
        <div v-if="inviteLink" class="text-body-1 mt-[1.5rem]">
          <i18n-t tag="div" keypath="discord.invite.link">
            <template #link>
              <NuxtLink
                :href="inviteLink"
                target="_blank"
                rel="noreferrer"
                class="font-medium text-rui-light-primary hover:text-rui-light-primary-darker"
              >
                {{ inviteLink }}
              </NuxtLink>
            </template>
          </i18n-t>
          <i18n-t v-if="expiry" tag="div" keypath="discord.invite.expiry">
            <template #expiry>
              <span class="font-medium text-rui-text-secondary">
                {{ expiry.toLocaleString() }}
              </span>
            </template>
          </i18n-t>
        </div>
      </div>
      <Recaptcha
        v-if="!inviteLink"
        class="basis-full md:basis-auto"
        :invalid="!valid"
        @error="onError()"
        @expired="onExpired()"
        @success="onCaptchaSuccess($event)"
        @captcha-id="captchaId = $event"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface BenefitDetails {
  title: string;
  description: string;
  icon: string;
}

const { t } = useI18n({ useScope: 'global' });

const benefits = computed<BenefitDetails[]>(() => [
  {
    title: t('discord.benefits.items.engagement.title'),
    description: t('discord.benefits.items.engagement.description'),
    icon: 'team-line',
  },
  {
    title: t('discord.benefits.items.bug_reporting.title'),
    description: t('discord.benefits.items.bug_reporting.description'),
    icon: 'bug-2-line',
  },

  {
    title: t('discord.benefits.items.community_support.title'),
    description: t('discord.benefits.items.community_support.description'),
    icon: 'questionnaire-line',
  },
  {
    title: t('discord.benefits.items.learn.title'),
    description: t('discord.benefits.items.learn.description'),
    icon: 'book-2-line',
  },
  {
    title: t('discord.benefits.items.stay_updated.title'),
    description: t('discord.benefits.items.stay_updated.description'),
    icon: 'newspaper-line',
  },
  {
    title: t('discord.benefits.items.networking.title'),
    description: t('discord.benefits.items.networking.description'),
    icon: 'wechat-line',
  },
]);
</script>

<template>
  <div class="container">
    <div
      class="text-primary py-[5rem] flex flex-col items-center self-stretch gap-[3rem]"
    >
      <div>
        <div class="text-h4">{{ t('discord.benefits.title') }}</div>
        <div class="text-body-1 mt-[1.25rem]">
          {{ t('discord.benefits.description') }}
        </div>
        <br />
        <div class="text-h4">{{ t('discord.benefits.title2') }}</div>
        <div class="text-body-1 mt-[1.25rem]">
          {{ t('discord.benefits.description2') }}
        </div>
      </div>
    </div>
  </div>
</template>

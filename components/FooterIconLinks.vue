<script setup lang="ts">
const menus = computed(() => [
  {
    title: 'Github',
    showText: false,
    href: 'https://github.com/LastL2',
    icon: 'github-line',
  },
  {
    title: 'X',
    showText: false,
    href: 'https://x.com/L2_Last',
    icon: 'twitter-line',
  },
]);
</script>

<template>
  <div class="flex flex-wrap items-center space-x-4">
    <div v-for="menu in menus" :key="menu.title">
      <ButtonLink size="lg" :to="menu.href" :title="menu.title" external>
        <span class="flex space-x-2 items-center">
          <span v-if="menu.showText">{{ menu.title }}</span>
          <RuiIcon :name="menu.icon" />
        </span>
      </ButtonLink>
    </div>
  </div>
</template>

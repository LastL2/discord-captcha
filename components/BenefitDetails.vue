<script lang="ts" setup>
defineProps<{
  icon: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <div
    class="flex max-w-[35rem] items-start gap-[1rem] basis-full xl:basis-[47%] 2xl:basis-1/2"
  >
    <div
      class="flex w-[3rem] h-[3rem] p-[0.75rem] justify-center items-center shrink-0 bg-rui-primary rounded-[0.625rem]"
    >
      <RuiIcon :name="icon" class="text-rui-dark-text" />
    </div>
    <div class="self-stretch text-body-1">
      <span class="font-medium">{{ title }}</span>
      <span class="ml-1">{{ description }}</span>
    </div>
  </div>
</template>

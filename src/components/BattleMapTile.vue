<template>
  <div class="tile"></div>
</template>

<script setup lang="ts">
defineProps({
  i: {
    type: Number,
    required: true
  },
  j: {
    type: Number,
    required: true
  }
})

const image: Ref<string> = ref('/src/assets/logo.png');

const imageUrl: ComputedRef<string> = computed(() =>
  `url(${image.value})`
);
</script>

<style scoped>
.tile {
  position: relative;
  aspect-ratio: 1 / 1;
  border: 1px solid rgb(var(--v-theme-background));
  background-color: transparent;
  background-image: v-bind(imageUrl);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

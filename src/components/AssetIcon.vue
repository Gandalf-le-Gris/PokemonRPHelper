<template>
  <div
    class="overlay"
    @dragstart="startDrag"
  >
    <v-tooltip
      location="bottom"
      class="bg-semi-transparent"
      offset="0"
    >
      <template #activator="{ props }">
        <div v-bind="props">
          <img :src="`/props/${asset.value}.png`" class="pixelated" :class="{'semi-transparent': !asset.visible}"/>
        </div>
      </template>
      <span class="text-white">
        {{ Object.values(assetsArray).flat().find(e => e.value === asset.value)?.title }}
      </span>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { assetsArray } from '@/types/props';
import { TileAsset } from '@/types/Room';

const props = defineProps<{
  asset: TileAsset
}>();

function startDrag(evt: DragEvent) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('asset', JSON.stringify({ uuid: props.asset.uuid }));
  }
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
  user-select: none;
}

.no-events {
  pointer-events: none;
}

img {
  width: 100%;
  aspect-ratio: 1 / 1;
}

.semi-transparent {
  opacity: .6;
}
</style>

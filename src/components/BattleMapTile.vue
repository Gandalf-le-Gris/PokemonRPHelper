<template>
  <div
    @drop="onDrop"
    @dragover.prevent
    @dragenter.prevent
    class="position-relative tile"
  >
    <canvas ref="canvas"/>
    <CharacterIcon v-if="character" :character :my-character :is-master/>
  </div>
</template>

<script setup lang="ts">
import { findTilePosition } from '@/utils/tileMap';
import { webSocketService } from '@/services/instances/webSocketService.instance';
import { BattleCharacter, RoomTile } from '@/types/Room';
import { PropType } from 'vue';

const props = defineProps({
  map: {
    type: Array as PropType<RoomTile[][]>,
    required: true
  },
  i: {
    type: Number,
    required: true
  },
  j: {
    type: Number,
    required: true
  },
  spriteSheet: {
    type: String,
    default: 'ForestPath'
  },
  isMaster: {
    type: Boolean,
    default: false
  },
  myCharacter: {
    type: String,
    required: false
  }
})

const canvas: Ref<HTMLCanvasElement | undefined> = ref();

async function paintTiles() {
  const ctx = canvas.value?.getContext('2d');
  if (ctx) {
    const img: HTMLImageElement = await new Promise(r => {
      const i = new Image();
      i.onload = (() => r(i));
      i.src = `/map-sprites/${props.spriteSheet}.png`;
    });
    ctx.imageSmoothingEnabled = false;
    const { i, j } = findTilePosition(props.map, props.i, props.j);
    ctx.drawImage(img, j * 24, i * 24, 24, 24, 0, 0, canvas.value!.width, canvas.value!.height);
  }
}

onMounted(paintTiles);

watch(() => [props.spriteSheet, webSocketService.getRoom().value], paintTiles);

const character: ComputedRef<BattleCharacter | undefined> = computed(() =>
  webSocketService.getRoom().value?.characters.find(c => c.i === props.i && c.j === props.j)
);

function onDrop(evt: DragEvent) {
  const characterUuid = evt.dataTransfer?.getData('character');
  const movedCharacter = webSocketService.getRoom().value?.characters.find(e => e.character.uuid === characterUuid);
  if (movedCharacter) {
    webSocketService.updateCharacter({
      ...movedCharacter,
      i: props.i,
      j: props.j,
    })
  }
}
</script>

<style scoped>
.tile {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-right: 1px solid rgb(var(--v-theme-background));
  border-bottom: 1px solid rgb(var(--v-theme-background));
}

  .tile > canvas {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
</style>

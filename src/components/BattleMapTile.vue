<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    location="top"
    :disabled="!isMaster || !room"
    width="200"
  >
    <template #activator="{ props }">
      <div
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent
        class="position-relative tile"
        v-bind="props"
      >
        <canvas ref="canvas"/>
        <template
          v-for="asset in room?.map[i][j].assets"
          :key="asset.uuid"
        >
          <AssetIcon
            v-if="asset.visible || isMaster"
            :asset
          />
        </template>
        <CharacterIcon
          v-if="character"
          @click.stop
          @mousedown="emit('mousedown')"
          :character
          :my-character
          :is-master
        />
      </div>
    </template>

    <v-card
      rounded="lg"
      width="200"
    >
      <template #title>
        <div class="text-subtitle-2">
          Options
        </div>
      </template>
      <template #append>
        <v-icon
          @click="showMenu = false"
          icon="mdi-close"
          size="x-small"
        />
      </template>
      <div class="pa-2 pt-0 d-flex flex-column">
        <v-select
          @update:model-value="updateTile"
          v-model="room!.map[i][j].terrain"
          label="Type"
          :items="roomTileTypeArray"
          item-value="value"
          item-title="title"
          density="compact"
          hide-details
        />
        <v-divider v-if="room!.map[i][j].assets.length" class="mt-3" color="transparent"/>
        <v-row
          v-for="asset in room!.map[i][j].assets"
          :key="asset.uuid"
          dense
          align="center"
        >
          <v-col class="text-body-2">
            {{ Object.values(assetsArray).flat().find(e => e.value === asset.value)?.title }}
          </v-col>
          <v-col cols="auto">
            <v-tooltip :text="asset.visible ? 'Masquer' : 'Afficher'" location="top">
              <template #activator="{ props }">
                <v-icon
                  @click="toggleAssetVisibility(asset)"
                  :icon="asset.visible ? 'mdi-eye' : 'mdi-eye-off'"
                  size="x-small"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="auto">
            <v-tooltip text="Supprimer" location="top">
              <template #activator="{ props }">
                <v-icon
                  @click="removeAsset(asset)"
                  icon="mdi-delete"
                  size="x-small"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { findTilePosition } from '@/utils/tileMap';
import { webSocketService } from '@/services/instances/webSocketService.instance';
import { Room, BattleCharacter, RoomTile, roomTileTypeArray, TileAsset } from '@/types/Room';
import { PropType } from 'vue';
import { assetsArray } from '@/types/props';

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
});

const emit = defineEmits(['mousedown']);

const canvas: Ref<HTMLCanvasElement | undefined> = ref();
const showMenu: Ref<boolean> = ref(false);
const room: Ref<Room | undefined> = webSocketService.getRoom();

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

watch(() => [props.spriteSheet, room.value?.map[props.i][props.j]], paintTiles);

const character: ComputedRef<BattleCharacter | undefined> = computed(() =>
  webSocketService.getRoom().value?.characters.find(c => c.i === props.i && c.j === props.j)
);

function onDrop(evt: DragEvent) {
  const characterUuid = evt.dataTransfer?.getData('character');
  const assetRaw = evt.dataTransfer?.getData('asset');
  if (characterUuid) {
    const movedCharacter = room.value?.characters.find(e => e.character.uuid === characterUuid);
    if (movedCharacter) {
      webSocketService.updateCharacter({
        ...movedCharacter,
        i: props.i,
        j: props.j,
      })
    }
  } else if (assetRaw && props.isMaster) {
    const asset = JSON.parse(assetRaw);
    if (asset.value) {
      room.value?.map[props.i][props.j].assets.push({ uuid: crypto.randomUUID(), value: asset.value, visible: !asset.value.includes('trap') });
      webSocketService.updateTile(props.i, props.j);
    } else if (asset.uuid) {
      webSocketService.moveAsset(asset.uuid, props.i, props.j);
    }
  }
}

function toggleAssetVisibility(asset: TileAsset) {
  if (room.value?.map[props.i][props.j].assets.find(a => a.uuid === asset.uuid)) {
    asset.visible = !asset.visible;
    webSocketService.updateTile(props.i, props.j);
  }
}

function removeAsset(asset: TileAsset) {
  if (room.value) {
    room.value.map[props.i][props.j].assets.splice(room.value.map[props.i][props.j].assets.findIndex(a => a.uuid === asset.uuid), 1);
    webSocketService.updateTile(props.i, props.j);
  }
  showMenu.value = false;
}

async function updateTile() {
  showMenu.value = false;
  await nextTick();
  webSocketService.updateTile(props.i, props.j);
}
</script>

<style scoped>
.tile {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-right: 1px solid rgb(var(--v-theme-background));
  border-bottom: 1px solid rgb(var(--v-theme-background));
  display: flex;
  cursor: pointer;
}

  .tile > canvas {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
</style>

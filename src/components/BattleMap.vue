<template>
  <div class="fill-height pa-2">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-row>
        <v-col cols="3">
          <div class="d-flex align-center justify-space-between">
            <div class="text-h5 font-weight-bold">
              Détails du combat
            </div>
            <v-tooltip text="Quitter" location="right">
              <template #activator="{ props }">
                <v-btn
                  @click="leaveRoom"
                  icon="mdi-exit-to-app"
                  size="x-large"
                  density="compact"
                  variant="flat"
                  class="bg-transparent"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </div>
          <v-expansion-panels class="mt-4" variant="accordion">
            <v-expansion-panel v-if="isMaster" title="Génération">
              <v-expansion-panel-text class="d-flex flex-column justify-between">
                <v-select
                  v-model="spriteSheet"
                  :items="spriteSheetArray.sort((a, b) => a.title.localeCompare(b.title))"
                  item-value="value"
                  item-title="title"
                  label="Environnement"
                  hide-details
                  variant="outlined"
                  density="compact"
                  class="mt-2"
                />
                <div class="text-caption mt-4 mb-n1">Taille</div>
                <v-slider
                  v-model="generationOptions.size"
                  min="8"
                  max="25"
                  step="1"
                  hide-details
                  thumb-label
                />
                <div class="text-caption mt-2 mb-n1">Difficulté du terrain</div>
                <v-slider
                  v-model="generationOptions.difficulty"
                  min="0"
                  max="20"
                  step="1"
                  hide-details
                  thumb-label
                />
                <div class="text-caption mt-2 mb-n1">Encombrement</div>
                <v-slider
                  v-model="generationOptions.crammed"
                  min="0"
                  max="20"
                  step="1"
                  hide-details
                  thumb-label
                />
                <v-btn
                  @click="regenerateMap"
                  text="Générer"
                  prepend-icon="mdi-cog"
                  class="mt-2 w-100"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel v-if="isMaster" title="Ennemis">
              <v-expansion-panel-text class="d-flex flex-column">
                <template v-for="enemy in room?.characters.filter(e => !e.isPlayer)" :key="enemy.character.uuid">
                  <v-row dense align="center" class="my-n2">
                    <v-col>
                      <v-btn
                        @click="character = enemy.character"
                        :text="enemy.character.name"
                        variant="flat"
                        class="w-100"
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-tooltip text="Supprimer" location="right">
                        <template #activator="{ props }">
                          <v-btn
                            @click="removeEnemy(enemy.character.uuid)"
                            icon="mdi-delete"
                            size="x-large"
                            density="compact"
                            variant="flat"
                            v-bind="props"
                          />
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </template>
                <div class="w-100 d-flex justify-center mt-2">
                  <v-tooltip text="Ajouter" location="right">
                    <template #activator="{ props }">
                      <v-btn
                        @click="addEnemy"
                        icon="mdi-plus-circle"
                        size="x-large"
                        density="compact"
                        variant="flat"
                        v-bind="props"
                      />
                    </template>
                  </v-tooltip>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Initiative">
              <v-expansion-panel-text class="d-flex flex-column">
                <div v-if="isMaster" class="d-flex justify-end mb-2">
                  <v-tooltip text="Trier" location="top">
                    <template #activator="{ props }">
                      <v-btn
                        @click="sortInitiative"
                        icon="mdi-sort-ascending"
                        size="large"
                        density="compact"
                        variant="flat"
                        v-bind="props"
                      />
                    </template>
                  </v-tooltip>
                  <v-tooltip text="Avancer" location="top">
                    <template #activator="{ props }">
                      <v-btn
                        @click="advanceInitiative"
                        icon="mdi-skip-next"
                        size="large"
                        density="compact"
                        variant="flat"
                        v-bind="props"
                      />
                    </template>
                  </v-tooltip>
                </div>
                <v-row
                  v-for="cId in room?.initiativeList"
                  :key="cId"
                  dense
                  align="center"
                >
                  <v-col :class="{'text-amber font-weight-bold': room?.activeCharacter === cId}">
                    {{ room?.characters.find(c => c.character.uuid === cId)?.character.name }}
                  </v-col>
                  <template v-if="isMaster">
                    <v-col cols="auto" class="mr-1">
                      {{ (room?.characters.find(c => c.character.uuid === cId)?.character.stats.spd ?? 0)
                        + (computeGlobalModifiers(room?.characters.find(c => c.character.uuid === cId)?.character!)?.stats?.spd ?? 0) }}
                    </v-col>
                    <v-col cols="auto" class="d-flex flex-column">
                      <v-btn
                        icon="mdi-chevron-up"
                        tile
                        size="xs"
                        variant="flat"
                        @click="upInitiative(cId)"
                      />
                      <v-btn
                        icon="mdi-chevron-down"
                        tile
                        size="xs"
                        variant="flat"
                        @click="downInitiative(cId)"
                      />
                    </v-col>
                  </template>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-card
            v-if="character"
            :title="character.name"
            :append-icon="isSelectedPlayer ? 'mdi-account' : 'mdi-robot-angry'"
            rounded="lg"
            class="mt-8 pa-4"
          >
            <v-row>
              <v-col cols="12">
                <div class="text-caption mt-2 mb-n1">Points de vie</div>
                <v-slider
                  @end="emit('update-character')"
                  v-model="character.hpt"
                  min="0"
                  :max="computeHPT(character)"
                  step="1"
                  hide-details
                  thumb-label
                  color="green"
                  track-color="red"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="map-grid">
          <template v-for="(row, i) in room?.map" :key="i">
            <battle-map-tile
              @mousedown="selectCharacter(i, j)"
              v-for="(_, j) in row"
              :key="j"
              :map="room!.map"
              :i
              :j
              :sprite-sheet
              :my-character
              :is-master
            />
          </template>
        </v-col>
      </v-row>
    </v-responsive>
  </div>
</template>

<script setup lang="ts">
import { spriteSheetArray } from '@/utils/spriteSheets';
import { webSocketService } from '@/services/instances/webSocketService.instance';
import { Character, computeHPT } from '@/types/pokemon';
import { computeGlobalModifiers } from '@/types/specificities';
import { ModelRef } from 'vue';

const props = defineProps({
  isMaster: {
    type: Boolean,
    default: false
  },
  myCharacter: {
    type: String,
    required: false
  }
});

const emit = defineEmits(['update-character']);

const character: ModelRef<Character | undefined> = defineModel();

const room = webSocketService.getRoom();
const spriteSheet: Ref<string> = ref(room.value?.environment ?? 'ForestPath');
const generationOptions: Ref<{ size: number, difficulty: number, crammed: number }> = ref({ size: 15, difficulty: 3, crammed: 3 });
const router = useRouter();

const gridTemplate: ComputedRef<string> = computed(() => 
  `repeat(${room.value?.map[0].length}, 1fr)`
);

function regenerateMap() {
  webSocketService.regenerateRoom(generationOptions.value, spriteSheet.value);
}

function addEnemy() {
  router.push('/encounter');
}

function removeEnemy(uuid: string) {
  webSocketService.removeCharacter(uuid);
}

function selectCharacter(i: number, j: number) {
  const char = room.value?.characters.find(c => c.i === i && c.j === j);
  if (char && props.isMaster) {
    character.value = char.character;
  }
}

function sortInitiative() {
  if (room.value) {
    room.value.initiativeList = room.value.characters
      .sort((a, b) => (b.character.stats.spd + (computeGlobalModifiers(b.character).stats?.spd ?? 0)) 
        - (a.character.stats.spd + (computeGlobalModifiers(a.character).stats?.spd ?? 0)))
      .map(e => e.character.uuid);
    updateInitiative();
  }
}

function advanceInitiative() {
  if (room.value) {
    const index = room.value.initiativeList.findIndex(id => id === room.value!.activeCharacter);
    if (index > -1) {
      room.value.activeCharacter = room.value.initiativeList[(index + 1) % room.value.initiativeList.length];
    } else if (room.value.initiativeList.length) {
      room.value.activeCharacter = room.value.initiativeList[0];
    }
  }
  updateInitiative();
}

function upInitiative(cId: string) {
  if (room.value) {
    const index = room.value.initiativeList.findIndex(id => id === cId);
    if (index > 0) {
      const id = room.value.initiativeList[index - 1];
      room.value.initiativeList[index - 1] = cId;
      room.value.initiativeList[index] = id;
    }
  }
  updateInitiative();
}

function downInitiative(cId: string) {
  if (room.value) {
    const index = room.value.initiativeList.findIndex(id => id === cId);
    if (index > -1 && index < room.value.initiativeList.length - 1) {
      const id = room.value.initiativeList[index + 1];
      room.value.initiativeList[index + 1] = cId;
      room.value.initiativeList[index] = id;
    }
  }
  updateInitiative();
}

function updateInitiative() {
  webSocketService.updateInitiative();
}

const isSelectedPlayer: ComputedRef<boolean> = computed(() =>
  !!room.value?.characters.find(c => c.character.uuid === character.value?.uuid)?.isPlayer
)

function leaveRoom() {
  localStorage.setItem('room-connection', '{}');
  webSocketService.getRoom().value = undefined;
  router.push('/room');
}

watch(() => room.value?.environment, (val) => {
  if (val) {
    spriteSheet.value = val;
  }
});

watch(() => room.value?.characters.length, () => {
  if (!room.value?.characters.some(c => c.character.uuid === character.value?.uuid)) {
    character.value = undefined;
  }
});

watch(() => room.value?.activeCharacter, (val) => {
  if (val && props.isMaster) {
    character.value = room.value?.characters.find(c => c.character.uuid === val)?.character;
  }
});
</script>

<style scoped>
.map-grid {
  display: grid;
  grid-template-columns: v-bind(gridTemplate);
}
</style>

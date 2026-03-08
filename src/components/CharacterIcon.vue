<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    location="top center"
    origin="bottom center"
    :disabled="!isMaster && !owned"
    width="200"
    :open-on-click="false"
  >
    <template #activator="{ props }">
      <div
        class="overlay"
        :class="{ active, isPlayer: character.isPlayer }"
        @dragstart="startDrag"
        v-bind="props"
        @click.stop="showMenu = false"
        @mousedown="$emit('mousedown')"
        @contextmenu.prevent="showMenu = !showMenu"
      >
        <v-tooltip
          location="bottom"
          class="bg-semi-transparent"
          offset="0"
        >
          <template #activator="{ props }">
            <div v-bind="props">
              <img
                :src="character.character.pokemon.sprites.front_default"
                :class="{ grayscale: character.character.hpt <= 0 }"
              />
              <v-progress-linear
                v-if="owned"
                v-model="hp"
                color="success"
                bg-color="error"
                bg-opacity="1"
                :max="computeHPT(character.character)"
                class="position-absolute top-0 left-0 w-100"
              />
              <div class="position-absolute bottom-0 d-flex w-100 justify-center">
                <v-tooltip
                  v-for="statusEffect in activeStatus"
                  :key="statusEffect.value"
                  class="bg-semi-transparent"
                  height="20"
                >
                  <template #activator="{ props }">
                    <v-icon
                      :icon="statusEffect.icon"
                      color="black"
                      size="x-small"
                      v-bind="props"
                    />
                  </template>
                  <div class="text-white text-caption my-n1 mx-n3">{{ statusEffect.title }}</div>
                </v-tooltip>
                <v-tooltip
                  v-for="stat in alteredStats"
                  :key="stat"
                  class="bg-semi-transparent"
                  height="20"
                >
                  <template #activator="{ props }">
                    <v-icon
                      :icon="(stats[stat] ?? 0) > 0 ? 'mdi-chevron-double-up' : 'mdi-chevron-double-down'"
                      :color="(stats[stat] ?? 0) > 0 ? 'green-darken-4' : 'red-darken-3'"
                      size="x-small"
                      v-bind="props"
                    />
                  </template>
                  <div class="text-white text-caption my-n1 mx-n3">
                    {{ statsArray.find(s => s.value === stat)?.title }} {{ (stats[stat] ?? 0) > 0 ? '+' : '' }}{{ stats[stat] }}%
                  </div>
                </v-tooltip>
              </div>
            </div>
          </template>
          <b class="text-red-lighten-1" :class="{ 'text-green-lighten-1': character.isPlayer }">
            {{ character.character.name }}
          </b>
        </v-tooltip>
      </div>
    </template>
    <v-card
      rounded="lg"
      width="280"
    >
      <template #title>
        <div class="text-subtitle-2">
          Statut
        </div>
      </template>
      <template #append>
        <v-icon
          @click="showMenu = false"
          icon="mdi-close"
          size="x-small"
        />
      </template>
      <div class="pa-2 pt-0 mt-n2 d-flex flex-column">
        <v-row
          dense
          align="center"
        >
          <v-col
            v-for="statusEffect in statusEffectArray"
            :key="statusEffect.value"
            cols="3"
          >
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-checkbox
                  v-model="status[statusEffect.value]"
                  hide-details
                  :append-icon="statusEffect.icon"
                  :icon-color="statusEffect.color"
                  :color="statusEffect.color"
                  :class="`text-${status[statusEffect.value] && statusEffect.color}`"
                  class="opacity-100-deep my-n2"
                  dense
                  v-bind="props"
                  @change="emits('status', status)"
                />
              </template>
              {{ statusEffect.title }}
            </v-tooltip>
          </v-col>
          <v-col cols="12">
            <v-divider />
          </v-col>
          <v-col
            v-for="stat in modifiableStatsArray"
            :key="stat.value"
            cols="12"
          >
            <v-row
              dense
              align="center"
            >
              <v-col
                cols="7"
                class="text-caption"
              >
                {{ stat.title }} :
              </v-col>
              <v-col
                class="text-body-2 font-weight-bold"
              >
                {{ stats[stat.value] }}%
              </v-col>
              <v-col
                cols="auto"
                class="d-flex flex-row"
              >
                <v-btn
                  icon="mdi-plus"
                  tile
                  size="xs"
                  @click="changeStats(stat.value, 25)"
                />
                <v-btn
                  icon="mdi-minus"
                  tile
                  size="xs"
                  @click="changeStats(stat.value, -25)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { computeHPT, modifiableStatsArray, StatName, statsArray } from '@/types/pokemon';
import { BattleCharacter, BattleCharacterStats, BattleCharacterStatus } from '@/types/Room';
import { StatusEffect, statusEffectArray } from '@/types/statusEffects';

const props = defineProps<{
  character: BattleCharacter
  isMaster?: boolean
  myCharacter?: string
  active?: boolean
}>();

const emits = defineEmits(['status', 'stats', 'mousedown']);

const showMenu: Ref<boolean> = ref(false);
const status: Ref<BattleCharacterStatus> = ref({ ...props.character.status });
const stats: Ref<BattleCharacterStats> = ref({ ...props.character.stats });

const activeStatus: ComputedRef<{ value: StatusEffect, title: string, color: string, icon: string }[]> = computed(() => {
  return statusEffectArray.filter(v => status.value[v.value]);
});
const alteredStats: ComputedRef<StatName[]> = computed(() => {
  return Object.entries(stats.value).filter(([, v]) => v).map(([k]) => k as StatName);
});

const owned: ComputedRef<boolean> = computed(() =>
  props.character.character.uuid === props.myCharacter || props.isMaster
);

function startDrag(evt: DragEvent) {
  if (owned.value && evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('character', props.character.character.uuid);
  }
}

function changeStats(stat: StatName, diff: number) {
  if (stats.value[stat] !== undefined) {
    stats.value[stat] += diff;
    emits('stats', stats.value);
  }
}

const hp: Ref<number> = ref(props.character.character.hpt);
watch(() => props.character.character.hpt, (val) => hp.value = val);

watch(() => props.character.status, (v) => status.value = { ...v }, { deep: true });
watch(() => props.character.stats, (v) => stats.value = { ...v }, { deep: true });
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff4;
  cursor: pointer;
  user-select: none;

  &.active {
    background-color: #fff8;

    &::before {
      position: absolute;
      top: 10%;
      left: 10%;
      width: 80%;
      height: 80%;
      content: '';
      background: url('/props/pokeball_icon.png');
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 25%;
    }
  }

  img {
    position: relative;
    z-index: 1;
  }
}

.no-events {
  pointer-events: none;
}

img {
  width: 100%;
  aspect-ratio: 1 / 1;
}

.grayscale {
  filter: grayscale(1);
}
</style>
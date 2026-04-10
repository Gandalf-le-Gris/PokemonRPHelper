<template>
  <v-row align="center" class="mb-4">
    <v-col>
      <v-text-field
        v-model="character.level"
        @update:model-value="$emit('update-level')"
        type="number"
        label="Niveau"
        hide-details
        density="compact"
        variant="outlined"
        min="0"
        class="font-weight-bold"
      />
    </v-col>
    <v-col class="d-flex align-center ga-2">
      <v-text-field
        v-model="character.hpt"
        label="PV"
        type="number"
        hide-details
        density="compact"
        variant="outlined"
        min="0"
        :max="maxHP"
        class="inner-compact font-weight-bold"
      >
        <template #append-inner>
          {{ `/${maxHP}` }}
        </template>
      </v-text-field>
      <v-menu
        v-model="showExtraHpMenu"
        :close-on-content-click="false"
        location="top center"
        origin="bottom center"
      >
        <template v-slot:activator="{ props: menuProps }">
          <v-tooltip location="top">
            <template v-slot:activator="{ props: tooltipProps }">
              <v-btn
                icon="mdi-fruit-pear"
                size="sm"
                v-bind="mergeProps(menuProps, tooltipProps)"
              />
            </template>
            PV supplémentaires
          </v-tooltip>
        </template>
        <v-card
          rounded="lg"
          width="200"
        >
          <template #title>
            <div class="text-subtitle-2">
              PV supplémentaires
            </div>
          </template>
          <template #append>
            <v-icon
              @click="showExtraHpMenu = false"
              icon="mdi-close"
              size="x-small"
            />
          </template>
          <div class="pa-2 pt-0 d-flex flex-column">
            <v-text-field
              type="number"
              v-model="character.extraHp"
              min="0"
              variant="outlined"
              density="compact"
              hide-details
            />
          </div>
        </v-card>
      </v-menu>
    </v-col>
  </v-row>
  <v-row v-for="stat in statsArray" :key="stat.value" class="ma-0" align="center">
    <v-col>
      <v-progress-linear
        v-model="character.stats[stat.value]"
        :buffer-value="character.stats[stat.value] + (characterMods.stats?.[stat.value] ?? 0)"
        buffer-opacity=".5"
        height="25"
        :max="maxStat"
        color="grey-darken-3"
      >
        {{ `${stat.title} : ${character.stats[stat.value] + (characterMods.stats?.[stat.value] ?? 0)}${characterMods.stats?.[stat.value] ? ` (+${characterMods.stats?.[stat.value]})` : ''}` }}
      </v-progress-linear>
    </v-col>
    <v-col cols="auto">
      <v-row>
        <v-btn
          icon="mdi-plus"
          tile
          size="xs"
          @click="character.stats[stat.value]++"
        />
      </v-row>
      <v-row>
        <v-btn
          icon="mdi-minus"
          tile
          size="xs"
          @click="character.stats[stat.value] = Math.max(character.stats[stat.value] - 1, 0)"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { StatName, statsArray, computeHPT, type Character } from '@/types/pokemon';
import { type Mod } from '@/types/specificities';
import { mergeProps, ModelRef } from 'vue';

const props = defineProps<{
  characterMods: Mod;
}>();

defineEmits<{
  'update-level': [];
}>();

const character: ModelRef<Character> = defineModel<Character>({ required: true });
const showExtraHpMenu = ref(false);

const maxHP = computed(() => computeHPT(character.value));

const maxStat = computed(() => {
  return Object.entries(character.value.stats).reduce((acc, x) => {
    if (!props.characterMods.stats) {
      return acc > x[1] ? acc : x[1];
    }
    const stat = x[0] as StatName;
    return acc > (x[1] + props.characterMods.stats[stat]) ? acc : (x[1] + props.characterMods.stats[stat]);
  }, 0);
});
</script>

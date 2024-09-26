<template>
  <v-card rounded="lg">
    <v-card-title class="mb-8">
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="character.name"
            label="Nom"
            hide-details
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="character.species"
            label="Espèce"
            disabled
            hide-details
          />
        </v-col>
        <v-col cols="auto" v-if="!isPlayerSheet">
          <v-btn
            @click="regenerateCharacter"
            icon="mdi-refresh"
            density="compact"
            variant="plain"
            size="x-large"
            :loading="regenerateLoading"
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="6">
          <v-row align="center" class="mb-4">
            <v-col>
              <v-sheet
                rounded="lg"
                class="bg-grey-darken-3 pa-2"
              >
                <v-tooltip location="top" :text="character.ability.desc">
                  <template #activator="{ props }">
                    <div class="text-subtitle-1 text-center" v-bind="props">
                      <span class="text-subtitle-2">Talent : </span>
                      {{ character.ability.title }}
                    </div>
                  </template>
                </v-tooltip>
              </v-sheet>
            </v-col>
            <v-col cols="auto">
              <v-text-field
                v-model="character.hpt"
                label="PV"
                type="number"
                width="120"
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
          <v-row align="center">
            <v-col cols="12">
              <v-sheet
                rounded="lg"
                class="bg-grey-darken-3 pa-2"
              >
                <v-row>
                  <v-col class="text-subtitle-1 text-center ma-0">
                    Spécificités
                  </v-col>
                </v-row>
                <v-row v-for="specificity in character.specificities" :key="specificity" class="mx-0 my-n3">
                  <v-col>
                    <v-tooltip location="top" :text="specificityArray.find(s => s.value === specificity)?.desc">
                      <template #activator="{ props }">
                        <span v-bind="props">
                          {{ specificityArray.find(s => s.value === specificity)?.title }}
                        </span>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row v-for="(talent, index) in talentArray" :key="talent.value" align="center" class="mx-0 my-n5">
            <v-col>
              {{ talent.title }}
            </v-col>
            <v-col cols="auto">
              <v-text-field
                v-if="((characterMods.talents?.find(e => e.name === talent.value)?.mod ?? 0) < 1000) && (character.ability.value !== 'Healer' || talent.value !== 'Heal')"
                v-model="character.talents[index].mod"
                type="number"
                width="84"
                hide-details
                density="compact"
                min="0"
                class="inner-compact"
              >
                <template #append-inner v-if="characterMods.talents?.find(e => e.name === talent.value)?.mod">
                  {{ `+${characterMods.talents?.find(e => e.name === talent.value)?.mod}` }}
                </template>
              </v-text-field>
              <v-text-field
                v-else
                width="84"
                hide-details
                density="compact"
                prepend-inner-icon="mdi-check"
                disabled
                class="text-success v-field__disabled-opacity-100"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { createCharacter } from '@/types/pokemon';
import { StatName, statsArray, type Character } from '@/types/pokemon';
import { computeGlobalModifiers } from '@/types/specificities';
import { specificityArray, type Mod } from '@/types/specificities';
import { talentArray } from '@/types/talents';
import { ModelRef } from 'vue';

defineProps({
  isPlayerSheet: Boolean
});

const character: ModelRef<Character> = defineModel<Character>({required: true});
const regenerateLoading: Ref<boolean> = ref<boolean>(false);

const characterMods: ComputedRef<Mod> = computed<Mod>(() => computeGlobalModifiers(character.value));
const maxHP: ComputedRef<number> = computed<number>(() => Math.max(1, character.value.stats.hp * (character.value.ability.value === 'Tank' ? 5 : 3)))

const maxStat: ComputedRef<number> = computed<number>(() => {
  return Object.entries(character.value.stats).reduce((acc, x) => {
    if (!characterMods.value.stats) {
      return acc > x[1] ? acc : x[1]
    }
    const stat = x[0] as StatName;
    return acc > (x[1] + characterMods.value.stats[stat]) ? acc : (x[1] + characterMods.value.stats[stat]);
  }, 0)
});

async function regenerateCharacter() {
  regenerateLoading.value = true;
  character.value = await createCharacter(character.value.pokemon, character.value.level);
  regenerateLoading.value = false;
}
</script>
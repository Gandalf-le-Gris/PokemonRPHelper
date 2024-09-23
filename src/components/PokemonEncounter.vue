<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="character.name"
            label="Nom"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="character.species"
            label="Espèce"
            disabled
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="6">
          <v-row v-for="stat in statsArray" :key="stat.value" class="ma-0" align="center">
            <v-col>
              <v-progress-linear
                v-model="character.stats[stat.value]"
                height="25"
                :max="Object.values(character.stats).reduce((acc, x) => acc > x ? acc : x, 0)"
                color="grey-darken-3"
              >
                {{ stat.title }} : {{ character.stats[stat.value] }}
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
        </v-col>
        <v-col cols="6">
          <v-row v-for="(talent, index) in talentArray" :key="talent.value" align="center" class="mx-0 my-n5">
            <v-col>
              {{ talent.title }}
            </v-col>
            <v-col cols="auto">
              <v-text-field
                v-model="character.talents[index].mod"
                type="number"
                width="80"
                hide-details
                density="compact"
                min="0"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { statsArray, type Character } from '@/types/pokemon';
import { talentArray } from '@/types/talents';
import { ModelRef } from 'vue';

const character: ModelRef<Character> = defineModel<Character>({required: true});
</script>
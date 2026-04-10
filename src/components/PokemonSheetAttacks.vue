<template>
  <v-row align="center">
    <v-col cols="12">
      <v-sheet
        rounded="lg"
        class="bg-grey-darken-3 pa-2"
      >
        <v-row>
          <v-col class="text-subtitle-1 text-center ma-0">
            Attaques
          </v-col>
        </v-row>
        <v-row v-for="(_, index) in character.attacks" :key="index" align="center" dense>
          <v-col v-if="!character.attacks[index].type" cols="4">
            <v-select
              v-model="character.attacks[index].type"
              :items="attackTypes"
              item-value="type"
              item-title="title"
              hide-details
              density="compact"
              variant="outlined"
              :label="`Type ${index + 1}`"
              :menu="autoOpen === index"
            />
          </v-col>
          <v-col v-else cols="auto">
            <type-image
              :type="character.attacks[index].type!"
              offensive
              class="cursor-pointer"
              @click="character.attacks[index].type = undefined; autoOpen = index"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="character.attacks[index].detail"
              :label="`Attaque ${index + 1}`"
              hide-details
              density="compact"
              variant="outlined"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn
              v-show="character.attacks[index].type"
              @click="$emit('open-status-dialog', index)"
              icon="mdi-help-circle"
              density="compact"
              color="transparent"
              elevation="0"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type Character } from '@/types/pokemon';
import { type TypeDetail } from '@/types/types';
import { ModelRef } from 'vue';

defineProps<{
  attackTypes: TypeDetail[];
}>();

defineEmits<{
  'open-status-dialog': [index: number];
}>();

const character: ModelRef<Character> = defineModel<Character>({ required: true });
const autoOpen = ref(-1);
</script>

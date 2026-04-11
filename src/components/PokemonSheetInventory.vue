<template>
  <v-row class="mt-8">
    <v-col cols="12" sm="7">
      <v-textarea
        v-model="character.inventory"
        hide-details="auto"
        :messages="inventoryValue"
        label="Inventaire"
        no-resize
        rows="10"
      />
    </v-col>
    <v-col cols="12" sm="5" class="d-flex flex-column justify-space-between">
      <v-text-field
        v-model="character.items.held"
        hide-details
        label="Objet tenu"
      />
      <v-text-field
        v-model="character.items.head"
        hide-details
        label="Tête"
        class="mt-2"
      />
      <v-text-field
        v-model="character.items.neck"
        hide-details
        label="Cou"
        class="mt-2"
      />
      <v-text-field
        v-model="character.items.belt"
        hide-details
        label="Ceinture"
        class="mt-2"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type Character } from '@/types/pokemon';
import { computeValue } from '@/types/items';
import { ModelRef } from 'vue';

const character: ModelRef<Character> = defineModel<Character>({ required: true });

const inventoryValue = computed(() => {
  const value = computeValue(character.value.inventory);
  if (value) return `Valeur totale : ${value}P`;
  return undefined;
});
</script>

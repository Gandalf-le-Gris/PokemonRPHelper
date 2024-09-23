<template>
  <v-row>
    <v-col cols="3">
      <v-select
        v-model="filters.difficulty"
        :items="difficulties"
        item-value="value"
        item-title="title"
        label="Difficulté"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        v-model="filters.biome"
        :items="biomes"
        item-value="value"
        item-title="title"
        clearable
        label="Environnement"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model="filters.amount"
        :min="1"
        type="number"
        label="Nombre"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model="filters.level"
        :min="1"
        type="number"
        label="Niveau cible"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { biomes, difficulties, EncounterFilters } from '@/types/encounterFilters';
import { ModelRef } from 'vue';

const filters: ModelRef<EncounterFilters> = defineModel<EncounterFilters>({ required: true });
</script>
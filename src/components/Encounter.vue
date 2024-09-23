<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-card title="Paramètres de la rencontre" class="pa-4">
        <encounter-filters v-model="filters"/>
        <div class="d-flex justify-space-around">
          <v-btn
            @click="generateEncounter"
            class="centered"
          >
            Générer une rencontre
          </v-btn>
        </div>
      </v-card>
      <v-row v-if="characters.length" class="mt-8">
        <v-col
          cols="6"
          v-for="character in characters"
          :key="character.uuid"
        >
          <pokemon-encounter :character/>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { encounterService } from '@/services/instances/encounterService.instance';
import { EncounterFilters } from '@/types/encounterFilters';
import { Character, createCharacter } from '@/types/pokemon';

export default defineComponent({
  name: 'Encounter',
  data: () => ({
    characters: [] as Character[],
    loading: false,
    filters: {
      difficulty: 'normal',
      biome: undefined,
      amount: 1,
      level: 5,
    } as EncounterFilters,
  }),
  methods: {
    async generateEncounter() {
      this.loading = true;
      this.characters = [];
      for (let i = 0; i < this.filters.amount; i++) {
        const pokemonDetails = await encounterService.getRandomPokemon(this.filters.biome);
        this.characters.push(await createCharacter(pokemonDetails, this.filters.level));
      }
      this.loading = false;
    },
  },
});
</script>

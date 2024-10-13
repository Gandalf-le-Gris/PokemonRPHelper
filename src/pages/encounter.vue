<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-card title="Paramètres de la rencontre" class="px-4 pb-4 pt-2" rounded="lg">
        <encounter-filters v-model="filters"/>
        <div class="d-flex justify-center mt-4">
          <v-btn
            @click="generateEncounter"
            :loading
          >
            Générer une rencontre
          </v-btn>
          <v-btn
            v-if="characters.length && webSocketService.getRoom().value?.uuid"
            @click="sendEncounterToRoom"
            class="ml-4"
          >
            Utiliser cette rencontre
          </v-btn>
        </div>
      </v-card>
      <v-row v-if="characters.length" class="mt-8">
        <v-col
          cols="12"
          x-lg="6"
          v-for="(character, index) in characters"
          :key="character.uuid"
        >
          <pokemon-sheet v-model="characters[index]"/>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="showError"
        :text="errorMessage"
        color="error"
        close-on-content-click
        close-delay="3000"
      />
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { encounterService } from '@/services/instances/encounterService.instance';
import { webSocketService } from '@/services/instances/webSocketService.instance';
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
    showError: false,
    errorMessage: '',
    webSocketService,
  }),
  methods: {
    async generateEncounter() {
      this.loading = true;
      this.characters = [];
      for (let i = 0; i < this.filters.amount; i++) {
        try {
          let level;
          switch (this.filters.difficulty) {
            case 'easy':
              level = Math.round(this.filters.level * .8);
              break;
            case 'hard':
              level = Math.round(this.filters.level * 1.2);
              break;
            default:
              level = this.filters.level;
          }
          level = Math.round(level * (.9 + .2 * Math.random()));
          const pokemonSpecies = await encounterService.getRandomPokemonWithLevel(level, this.filters.biome);
          this.characters.push(await createCharacter(pokemonSpecies, level));
        } catch (e) {
          if (e instanceof Error) {
            this.showError = true;
            this.errorMessage = e.message;
          }
        }
      }
      this.loading = false;
    },
    async sendEncounterToRoom() {
      this.characters.forEach(c => {
        webSocketService.addCharacter(c, false);
      });
      this.$router.push('/room')
    }
  },
});
</script>

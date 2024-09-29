<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-card title="Mes personnages" class="pa-4" rounded="lg">
        <v-row align="center">
          <v-col cols="6">
            <v-select
              v-model="character"
              :items="characters"
              return-object
              item-value="uuid"
              item-title="name"
              hide-details
              no-data-text="Aucun Pokémon enregistré"
            />
          </v-col>
          <v-col></v-col>
          <v-col cols="auto">
            <v-btn
              @click="newCharacter"
              icon="mdi-plus-circle"
              density="compact"
              variant="plain"
              size="x-large"
            />
          </v-col>
        </v-row>
      </v-card>
      <pokemon-sheet
        v-if="character"
        v-model="character"
        @saved="reloadCharacters"
        is-player-sheet
        class="mt-8"
      />
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { encounterService } from '@/services/instances/encounterService.instance';
import { Character, createCharacter } from '@/types/pokemon';


export default defineComponent({
  name: 'CharacterSheet',
  data: () => ({
    character: undefined as Character | undefined,
    characters: [] as Character[],
  }),
  methods: {
    async newCharacter() {
      const pokemonDetails = await encounterService.getRandomPokemon();
      this.character = await createCharacter(pokemonDetails, 0);
      console.log(this.character)
    },
    reloadCharacters() {
      this.characters = Object.values(JSON.parse(localStorage.getItem('saved-characters') ?? '{}'));
    }
  },
  mounted() {
    this.reloadCharacters();
  }
});
</script>

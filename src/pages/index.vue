<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-card title="Mes personnages" class="pa-4" rounded="lg">
        <v-row align="center">
          <v-col cols="12" md="">
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
          <v-col cols="auto" v-if="character">
            <v-btn
              @click="exportSheet"
              prepend-icon="mdi-file-export"
              text="Exporter"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn
              @click="startImportSheet"
              prepend-icon="mdi-file-import"
              text="Importer"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn
              @click="newCharacter"
              prepend-icon="mdi-plus-circle"
              text="Nouveau"
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

      <input id="file-select" type="file" accept="application/json" style="display: none" @change="importSheet"/>
      <v-snackbar
        v-model="showError"
        :text="errorMessage"
        color="error"
        close-delay="5000"
      />
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { encounterService } from '@/services/instances/encounterService.instance';
import { isCharacter } from '@/types/pokemon'
import { Character, createCharacter } from '@/types/pokemon';


export default defineComponent({
  name: 'CharacterSheet',
  data: () => ({
    character: undefined as Character | undefined,
    characters: [] as Character[],
    showError: false,
    errorMessage: '',
  }),
  methods: {
    async newCharacter() {
      const pokemonDetails = await encounterService.getRandomPokemon();
      this.character = await createCharacter(pokemonDetails, 0);
    },
    async reloadCharacters() {
      this.characters = Object.values(JSON.parse(localStorage.getItem('saved-characters') ?? '{}'));
    },
    startImportSheet() {
      const fileSelect = document.getElementById('file-select');
      if (fileSelect) {
        fileSelect.click();
      } else {
        this.errorMessage = "Fonctionnalité non supportée par le navigateur";
        this.showError = true;
      }
    },
    async importSheet(event: Event) {
      try {
        const character: any = JSON.parse(await (event?.target as HTMLInputElement).files?.[0].text() ?? '{}');
        if (isCharacter(character)) {
          this.character = character;
        } else {
          this.errorMessage = "Format de données invalide";
          this.showError = true;
        }
      } catch (e) {
        this.errorMessage = "Erreur lors de l'ouverture du fichier";
        this.showError = true;
      }
    },
    exportSheet() {
      if (this.character) {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.character));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute('href', dataStr);
        dlAnchorElem.setAttribute('download', `${this.character.name}.json`);
        dlAnchorElem.click();
        document.body.removeChild(dlAnchorElem);
      }
    },
  },
  mounted() {
    this.reloadCharacters();
    const lastSaved = JSON.parse(localStorage.getItem('last-saved') ?? '""');
    if (lastSaved) {
      this.character = this.characters.find(p => p.uuid === lastSaved);
    }
  }
});
</script>

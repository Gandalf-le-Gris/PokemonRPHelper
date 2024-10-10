<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-card title="Mes personnages" class="px-4 pb-4 pt-2 mb-8" rounded="lg">
        <v-row align="center" dense>
          <v-col cols="12" sm>
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
          <v-col sm="auto"></v-col>
          <v-col cols="auto" v-show="character && characters.some(e => e.uuid === character?.uuid)">
            <v-tooltip text="Supprimer" location="top">
              <template #activator="{ props }">
                <v-btn
                  @click="confirmDelete = true"
                  icon="mdi-delete"
                  density="compact"
                  elevation="0"
                  size="x-large"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="auto" v-show="character">
            <v-tooltip text="Exporter" location="top">
              <template #activator="{ props }">
                <v-btn
                  @click="exportSheet"
                  icon="mdi-file-export"
                  density="compact"
                  elevation="0"
                  size="x-large"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="auto">
            <v-tooltip text="Importer" location="top">
              <template #activator="{ props }">
                <v-btn
                  @click="startImportSheet"
                  icon="mdi-file-import"
                  density="compact"
                  elevation="0"
                  size="x-large"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="auto">
            <v-tooltip text="Nouveau" location="top">
              <template #activator="{ props }">
                <v-btn
                  @click="newCharacter"
                  icon="mdi-plus-circle"
                  density="compact"
                  elevation="0"
                  size="x-large"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card>
      <pokemon-sheet
        v-if="character"
        v-model="character"
        @saved="reloadCharacters"
        is-player-sheet
      />

      <input id="file-select" type="file" accept="application/json" style="display: none" @change="importSheet"/>
      <v-snackbar
        v-model="showError"
        :text="errorMessage"
        color="error"
        close-delay="5000"
      />

      <confirm-cancel-dialog
        v-model="confirmDelete"
        @confirm="deleteSheet"
        title="Supprimer la fiche ?"
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
    confirmDelete: false,
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
    deleteSheet() {
      if (this.character) {
        const saved = JSON.parse(localStorage.getItem('saved-characters') ?? '{}');
        delete saved[this.character.uuid];
        localStorage.setItem('saved-characters', JSON.stringify(saved));
        localStorage.setItem('last-saved', '""');
        this.character = undefined;
        this.reloadCharacters();
      }
    }
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

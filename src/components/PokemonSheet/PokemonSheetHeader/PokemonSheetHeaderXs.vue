<template>
  <v-card-title class="mb-8">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="character.name"
          label="Nom"
          hide-details
        />
      </v-col>
      <v-col cols="12">
        <v-row align="center">
          <v-col cols="auto" class="d-flex flex-column align-center">
            <v-sheet
              border="md grey-darken-3"
              rounded="xl"
            >
              <v-img :src="character.pokemon.sprites.front_default" width="96"/>
            </v-sheet>
            <TypeImage :type="alteredTypes[0]" defensive open-on-click class="mt-2"/>
            <TypeImage v-if="alteredTypes[1]" :type="alteredTypes[1]" defensive open-on-click class="mt-1"/>
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="character.species"
              :items="searchArray"
              item-value="value"
              item-title="title"
              label="Espèce"
              hide-details
              no-data-text="Aucun Pokémon trouvé"
              @update:model-value="character.variety = 0; $emit('update-species')"
            />
            <v-select
              v-if="varieties.length > 1"
              v-model="character.variety"
              :items="varieties"
              item-value="value"
              item-title="title"
              label="Variante"
              hide-details
              class="mt-2"
              @update:model-value="$emit('update-species')"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center">
          <v-col>
            <v-sheet
              rounded="lg"
              class="bg-grey-darken-3 pa-2"
            >
              <v-tooltip
                location="top"
                max-width="512"
                open-on-click
                content-class="accept-linebreak"
              >
                <template #activator="{ props }">
                  <div v-bind="props" class="text-subtitle-1 text-center">
                    <span class="text-subtitle-2">Talent : </span>
                    {{ character.ability.title }}
                    <span v-if="character.extraAbility"> + {{ character.extraAbility.title }}</span>
                  </div>
                </template>
                <span>{{ character.ability.desc }}</span>
                <span v-if="character.extraAbility"><br/>{{ character.extraAbility.desc }}</span>
              </v-tooltip>
            </v-sheet>
          </v-col>
          <v-col cols="auto" class="d-flex flex-column">
            <v-btn
              v-if="!isPlayerSheet"
              prepend-icon="mdi-refresh"
              text="Régénérer"
              :loading="regenerateLoading"
              variant="outlined"
              color="grey"
              size="small"
              class="mb-2"
              @click="$emit('regenerate')"
            />
            <v-btn
              v-if="isPlayerSheet && !isBattleSheet"
              prepend-icon="mdi-refresh"
              text="Réinitialiser"
              variant="outlined"
              color="grey"
              size="small"
              class="mb-2"
              @click="$emit('confirm-reset')"
            />
            <v-btn
              v-if="isPlayerSheet || isBattleSheet"
              prepend-icon="mdi-content-save"
              text="Enregistrer"
              variant="outlined"
              color="grey"
              size="small"
              @click="$emit('save')"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card-title>
</template>

<script setup lang="ts">
import { type ModelRef } from 'vue';
import { searchArray } from '@/types/search';
import { type Character } from '@/types/pokemon';
import { type Type } from '@/types/types';
import { getVarieties } from '@/utils/varieties';

defineProps<{
  isPlayerSheet?: boolean;
  isBattleSheet?: boolean;
  regenerateLoading: boolean;
}>();

defineEmits<{
  'update-species': [];
  'regenerate': [];
  'save': [];
  'confirm-reset': [];
}>();

const character: ModelRef<Character> = defineModel<Character>({ required: true });

const varieties = computed(() => getVarieties(character.value));

const alteredTypes = computed<Type[]>(() => {
  const types: Type[] = [...character.value.pokemon.types];
  if (character.value.swappedTypes) {
    Object.values(character.value.swappedTypes).forEach(([index, type]) => types[index] = type);
  }
  return types;
});
</script>

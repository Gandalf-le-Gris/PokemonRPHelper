<template>
  <v-card-title class="mb-8">
    <v-row align="center">
      <v-col>
        <v-row align="center">
          <v-col cols="12" sm="5">
            <v-text-field
              v-model="character.name"
              label="Nom"
              hide-details
            />
          </v-col>
          <v-col cols="12" sm="7">
            <v-row>
              <v-col cols="12" sm>
                <v-autocomplete
                  v-model="character.species"
                  :items="searchArray"
                  item-value="value"
                  item-title="title"
                  label="Espèce"
                  hide-details
                  no-data-text="Aucun Pokémon trouvé"
                  @update:modelValue="character.variety = 0; $emit('update-species')"
                />
              </v-col>
              <v-col v-if="varieties.length > 1" cols="12" sm="6">
                <v-select
                  v-model="character.variety"
                  :items="varieties"
                  item-value="value"
                  item-title="title"
                  label="Variante"
                  hide-details
                  @update:modelValue="$emit('update-species')"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm>
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
                  <div class="text-subtitle-1 text-center" v-bind="props">
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
            <TypeImage :type="alteredTypes[0]" defensive open-on-click/>
            <TypeImage v-if="alteredTypes[1]" :type="alteredTypes[1]" defensive open-on-click class="mt-2"/>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              v-if="!isPlayerSheet"
              @click="$emit('regenerate')"
              icon="mdi-refresh"
              density="compact"
              variant="plain"
              size="x-large"
              :loading="regenerateLoading"
            />
            <v-btn
              v-if="isPlayerSheet && !isBattleSheet"
              @click="$emit('confirm-reset')"
              icon="mdi-refresh"
              density="compact"
              variant="plain"
              size="x-large"
            />
            <v-btn
              v-if="isPlayerSheet || isBattleSheet"
              @click="$emit('save')"
              icon="mdi-content-save"
              density="compact"
              variant="plain"
              size="x-large"
            />
          </v-col>
          <v-col v-if="$vuetify.display.xs" cols="auto" class="d-flex justify-center">
            <v-sheet
              border="md grey-darken-3"
              rounded="lg"
              max-width="80"
            >
              <v-img :src="character.pokemon.sprites.front_default" width="80"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="$vuetify.display.smAndUp" cols="12" sm="auto" class="d-flex justify-center align-center">
        <v-sheet
          border="md grey-darken-3"
          rounded="xl"
          max-width="128"
        >
          <v-img :src="character.pokemon.sprites.front_default" width="128"/>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card-title>
</template>

<script setup lang="ts">
import { searchArray } from '@/types/search';
import { type Character } from '@/types/pokemon';
import { type Type } from '@/types/types';
import { getVarieties } from '@/utils/varieties';
import { ModelRef } from 'vue';

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

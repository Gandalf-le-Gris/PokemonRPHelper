<template>
  <v-row align="center" class="mt-6">
    <v-col>
      <v-sheet
        rounded="lg"
        class="bg-grey-darken-3 pa-2"
      >
        <v-row>
          <v-col class="text-subtitle-1 text-center ma-0 mb-n3">
            Expérience
          </v-col>
        </v-row>
        <v-row align="center" dense class="mt-4 mx-2">
          <v-col v-for="key in Object.keys(experienceLabels)" :key cols="6" md="3">
            <v-checkbox
              v-if="key !== 'ko'"
              v-model="character.experience[key as 'ko']"
              :label="experienceLabels[key as 'ko']"
              hide-details
              density="compact"
            />
            <v-text-field
              v-else
              v-model="character.experience['ko']"
              label="Pokémon KO"
              type="number"
              hide-details
              density="compact"
              variant="outlined"
              min="0"
              max-width="120"
              class="inner-compact font-weight-bold"
            >
              <template #append-inner>
                /5
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn
              @click="$emit('level-up')"
              :disabled="!canLevelUp"
              text="Gain de niveau"
              prepend-icon="mdi-creation"
              rounded="lg"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type Character } from '@/types/pokemon';
import { experienceLabels } from '@/types/experience';
import { ModelRef } from 'vue';

defineEmits<{
  'level-up': [];
}>();

const character: ModelRef<Character> = defineModel<Character>({ required: true });

const canLevelUp = computed(() => {
  const target = character.value.iqSkills.some(iq => iq.value === 'Fast learner') ? 3 : 4;
  return Object.values(character.value.experience).filter(e => e === true || e >= 5).length >= target;
});
</script>

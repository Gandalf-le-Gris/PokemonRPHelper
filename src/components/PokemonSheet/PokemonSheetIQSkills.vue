<template>
  <v-row class="mt-8">
    <v-col>
      <v-sheet
        rounded="lg"
        class="bg-grey-darken-3 pa-2"
      >
        <v-row>
          <v-col class="text-subtitle-1 text-center ma-0">
            Compétences de QI
          </v-col>
        </v-row>
        <v-row dense>
          <v-col
            v-for="(_, index) in character.iqSkills"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-tooltip location="top" :text="character.iqSkills[index].desc" open-on-click>
              <template #activator="{ props }">
                <v-select
                  v-model="character.iqSkills[index]"
                  :label="`Niveau ${(index + 1) * 5}`"
                  hide-details
                  item-value="value"
                  item-title="title"
                  return-object
                  :items="iqSkillArray.filter(s => (s.level <= (index + 1) * 5) && (!character.iqSkills.some((k, i) => k.value === s.value && i !== index)))"
                  v-bind="props"
                  @update:model-value="$emit('iq-change', index)"
                />
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type Character } from '@/types/pokemon';
import { iqSkillArray } from '@/types/iqSkills';
import { ModelRef } from 'vue';

defineEmits<{
  'iq-change': [index: number];
}>();

const character: ModelRef<Character> = defineModel<Character>({ required: true });
</script>

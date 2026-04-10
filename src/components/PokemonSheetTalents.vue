<template>
  <v-row v-for="(talent, index) in talentArray" :key="talent.value" align="center" class="mx-0 my-n5">
    <v-col>
      {{ talent.title }}
    </v-col>
    <v-col cols="auto">
      <v-text-field
        v-if="((characterMods.talents?.find(e => e.name === talent.value)?.mod ?? 0) < 1000) && (character.ability.value !== 'Healer' || talent.value !== 'Heal')"
        v-model.number="character.talents[index].mod"
        type="number"
        width="84"
        hide-details
        density="compact"
        min="0"
        class="inner-compact"
      >
        <template #append-inner v-if="characterMods.talents?.find(e => e.name === talent.value)?.mod">
          {{ `+${characterMods.talents?.find(e => e.name === talent.value)?.mod}` }}
        </template>
      </v-text-field>
      <v-text-field
        v-else
        width="84"
        hide-details
        density="compact"
        prepend-inner-icon="mdi-check"
        disabled
        class="text-success v-field__disabled-opacity-100"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type Character } from '@/types/pokemon';
import { type Mod } from '@/types/specificities';
import { talentArray } from '@/types/talents';
import { ModelRef } from 'vue';

defineProps<{
  characterMods: Mod;
}>();

const character: ModelRef<Character> = defineModel<Character>({ required: true });
</script>

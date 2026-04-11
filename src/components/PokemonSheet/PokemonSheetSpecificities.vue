<template>
  <v-row align="center">
    <v-col cols="12">
      <v-sheet
        rounded="lg"
        class="bg-grey-darken-3 pa-2"
      >
        <v-row>
          <v-col class="text-subtitle-1 text-center ma-0">
            Spécificités
          </v-col>
        </v-row>
        <v-row v-for="specificity in specificities" :key="specificity" class="mx-0 my-n3">
          <v-col>
            <v-tooltip location="top" :text="specificityArray.find(s => s.value === specificity)?.desc" max-width="512" open-on-click>
              <template #activator="{ props }">
                <span v-bind="props">
                  {{ specificityArray.find(s => s.value === specificity)?.title }}
                </span>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { specificityArray, type SpecificityType } from '@/types/specificities';

defineProps<{
  specificities: SpecificityType[];
}>();
</script>

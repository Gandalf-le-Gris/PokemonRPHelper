<template>
  <v-dialog v-model="openRandom" max-width="800">
    <v-card
      rounded="lg"
      title="Objet aléatoire"
      class="px-4 pb-4"
    >
      <v-row dense align="center">
        <v-col cols="12">
          <v-select
            v-model="filters.type"
            label="Type"
            :items="itemTypeArray"
            item-value="value"
            item-title="title"
            hide-details
            clearable
          />
        </v-col>
        <v-col cols="12" sm>
          <v-text-field
            v-model="filters.minPrice"
            :min="0"
            type="number"
            label="Prix minimal"
            hide-details
            clearable
          />
        </v-col>
        <v-col cols="12" sm>
          <v-text-field
            v-model="filters.maxPrice"
            :min="filters.minPrice ?? 0"
            type="number"
            label="Prix maximal"
            hide-details
            clearable
          />
        </v-col>
        <v-col cols="12" sm="auto">
          <v-checkbox
            v-model="filters.notSold"
            label="Non vendu"
            hide-details
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-center mt-3">
        <v-btn
          @click="findItem"
          text="Trouver"
          prepend-icon="mdi-shuffle-variant"
        />
      </div>
      <v-divider v-if="randomItem" class="my-6"/>
      <div v-if="typeof randomItem === 'string'" class="d-flex justify-center text-body-1">{{ randomItem }}</div>
      <v-row v-else dense align="center">
        <v-col class="font-weight-bold">
          {{ randomItem.name }}
        </v-col>
        <v-col cols="auto">
          {{ randomItem.buy ? `${randomItem.buy}P` : 'N/A' }} / {{ randomItem.sell ? `${randomItem.sell}P` : 'N/A' }}
        </v-col>
        <v-col v-if="randomItem.desc" cols="12">
          {{ randomItem.desc }}
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import items, { Item, ItemType, itemTypeArray } from '@/types/items';
import { ModelRef } from 'vue';

interface RandomItemFilters {
  type?: ItemType,
  minPrice?: number,
  maxPrice?: number,
  notSold?: boolean,
}

const openRandom: ModelRef<boolean> = defineModel({required: true});
const randomItem: Ref<Item | string> = ref('');
const filters: Ref<RandomItemFilters> = ref({});

function findItem() {
  const choices = (filters.value.type ? items[filters.value.type] : Object.values(items).flat())
    .filter(e => filters.value.notSold ? !e.buy : e)
    .filter(e => filters.value.minPrice ? e.sell && e.sell >= filters.value.minPrice : e)
    .filter(e => filters.value.maxPrice ? e.sell && e.sell <= filters.value.maxPrice : e);
  if (choices.length) {
    randomItem.value = choices[Math.floor(Math.random() * choices.length)];
  } else {
    randomItem.value = 'Aucun objet ne correspond à ces filtres';
  }
}

watch(() => openRandom.value, (val) => {
  if (val) {
    randomItem.value = '';
    filters.value = {};
  }
});
</script>

<template>
  <!-- eslint-disable vue/valid-v-slot -->

  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-card title="Aide aux objets" class="px-4 pb-4 pt-2" rounded="lg">
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              v-model="filters.name"
              label="Nom"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="auto">
            <v-tooltip text="Aléatoire" location="top">
              <template #activator="{ props }">
                <v-btn
                  @click="openRandom = true"
                  icon="mdi-shuffle-variant"
                  density="compact"
                  elevation="0"
                  size="x-large"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="auto">
            <v-tooltip text="Filtres" location="top">
              <template #activator="{ props }">
                <v-btn
                  @click="openFilters = !openFilters"
                  icon="mdi-filter"
                  density="compact"
                  elevation="0"
                  size="x-large"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-expand-transition>
          <v-row
            v-if="openFilters"
            align="center"
            dense
          >
            <v-col cols="12" sm="6">
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
            <v-col cols="6" sm="3">
              <v-text-field
                v-model="filters.minPrice"
                :min="0"
                type="number"
                label="Prix minimal"
                hide-details
                clearable
              />
            </v-col>
            <v-col cols="6" sm="3">
              <v-text-field
                v-model="filters.maxPrice"
                :min="filters.minPrice ?? 0"
                type="number"
                label="Prix maximal"
                hide-details
                clearable
              />
            </v-col>
          </v-row>
        </v-expand-transition>
      </v-card>

      <v-card
        v-for="itemType in Object.keys(filteredItems)"
        :key="itemType"
        :title="itemTypeArray.find(e => e.value === itemType)?.title"
        class="px-4 pb-2 mt-8"
        rounded="lg"
      >
        <v-data-table
          :items="filteredItems[itemType as ItemType]"
          :headers="itemType === 'clothing' ? clothingHeaders : headers"
          mobile-breakpoint="sm"
          items-per-page-text="Objets par page :"
          :items-per-page-options
          :hide-default-footer="filteredItems[itemType as ItemType].length <= 10"
          :pageText="'{0}-{1} de {2}'"
        >
          <template v-slot:item.buy="{ item }">
            <span v-if="item.buy">{{ item.buy }}P</span>
          </template>
          <template v-slot:item.sell="{ item }">
            <span v-if="item.sell">{{ item.sell }}P</span>
          </template>
          <template v-slot:item.head="{ item }">
            <v-icon
              :icon="(item as Clothing).head ? 'mdi-check' : 'mdi-close'"
              :color="(item as Clothing).head ? 'success' : 'error'"
              size="large"
            />
          </template>
          <template v-slot:item.neck="{ item }">
            <v-icon
              :icon="(item as Clothing).neck ? 'mdi-check' : 'mdi-close'"
              :color="(item as Clothing).neck ? 'success' : 'error'"
              size="large"
            />
          </template>
          <template v-slot:item.belt="{ item }">
            <v-icon
              :icon="(item as Clothing).belt ? 'mdi-check' : 'mdi-close'"
              :color="(item as Clothing).belt ? 'success' : 'error'"
              size="large"
            />
          </template>
        </v-data-table>
      </v-card>
      <div v-if="!Object.keys(filteredItems).length" class="mt-8 text-h6 text-center">Aucun objet trouvé...</div>
    </v-responsive>
  </v-container>

  <random-item-card v-model="openRandom"/>
</template>

<script setup lang="ts">
import items, { Clothing, Item, ItemType, itemTypeArray } from '@/types/items';

interface Filters {
  name: string | null,
  type?: ItemType,
  minPrice?: number,
  maxPrice?: number
}

const filters: Ref<Filters> = ref({ name: '' });
const debouncedName: Ref<string> = ref('');
let nameTimeout: number = -1;

const openRandom: Ref<boolean> = ref(false);
const openFilters: Ref<boolean> = ref(false);

watch(() => filters.value.name, (val: string | null) => {
  clearTimeout(nameTimeout);
  if (val !== null) {
    nameTimeout = Number(setTimeout(() => debouncedName.value = val, 300));
  } else {
    debouncedName.value = '';
  }
})

const filteredItems: ComputedRef<Record<ItemType, Item[]>> = computed(() => {
  let res = {} as Record<ItemType, Item[]>;
  for (const itemType in items) {
    if (!filters.value.type || itemType === filters.value.type) {
      const values = items[itemType as ItemType]
        .filter(e => debouncedName.value.toLowerCase().split(' ').every(t => e.name.toLowerCase().includes(t)))
        .filter(e => !filters.value.minPrice || e.buy && e.buy >= filters.value.minPrice)
        .filter(e => !filters.value.maxPrice || e.buy && e.buy <= filters.value.maxPrice);
      if (values.length) {
        res[itemType as ItemType] = values.sort((a, b) => a.name.localeCompare(b.name));
      }
    }
  }
  return res;
});

const headers = [
  { title: 'Nom', value: 'name', sortable: true },
  { title: 'Description', value: 'desc' },
  { title: 'Achat', value: 'buy', sortable: true },
  { title: 'Vente', value: 'sell', sortable: true }
];

const clothingHeaders = [
  ...headers,
  { title: 'Tête', value: 'head' },
  { title: 'Cou', value: 'neck' },
  { title: 'Ceinture', value: 'belt' }
];

const itemsPerPageOptions = [
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: -1, title: 'Tous'}
];
</script>

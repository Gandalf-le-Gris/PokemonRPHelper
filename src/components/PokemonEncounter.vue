<template>
  <v-card
    :title="character.name"
  >

  </v-card>
</template>

<script lang="ts">
import { type Character } from '@/types/pokemon';

export default defineComponent({
  name: 'PokemonEncounter',
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true,
    },
  },
});
</script>
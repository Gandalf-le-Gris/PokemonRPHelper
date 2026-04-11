<template>
  <component
    v-model="character"
    :is="currentComponent"
    :is-player-sheet
    :is-battle-sheet
    :regenerate-loading
    @update-species="$emit('update-species')"
    @regenerate="$emit('regenerate')"
    @save="$emit('save')"
    @confirm-reset="$emit('confirm-reset')"
  />
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { type ModelRef } from 'vue';
import { type Character } from '@/types/pokemon';
import PokemonSheetHeaderXs from './PokemonSheetHeaderXs.vue';
import PokemonSheetHeaderSm from './PokemonSheetHeaderSm.vue';
import PokemonSheetHeaderMd from './PokemonSheetHeaderMd.vue';

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

const { xs, sm } = useDisplay();

const currentComponent = computed(() => {
  if (xs.value) return PokemonSheetHeaderXs;
  if (sm.value) return PokemonSheetHeaderSm;
  return PokemonSheetHeaderMd;
});
</script>

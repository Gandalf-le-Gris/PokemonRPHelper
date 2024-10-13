<template>
  <div
    class="overlay"
    @dragstart="startDrag"
  >
    <v-tooltip
      location="bottom"
      class="bg-semi-transparent"
      offset="0"
    >
      <template #activator="{ props }">
        <div v-bind="props">
          <img :src="character.character.pokemon.sprites.front_default" :class="{grayscale: !character.character.hpt}"/>
          <v-progress-linear
            v-if="owned"
            v-model="hp"
            color="success"
            bg-color="error"
            bg-opacity="1"
            :max="computeHPT(character.character)"
            class="position-absolute top-0 left-0 w-100"
          />
        </div>
      </template>
      <b class="text-red-lighten-1" :class="{ 'text-green-lighten-1': character.isPlayer }">
        {{ character.character.name }}
      </b>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computeHPT } from '@/types/pokemon';
import { BattleCharacter } from '@/types/Room';
import { PropType } from 'vue';

const props = defineProps({
  character: {
    type: Object as PropType<BattleCharacter>,
    required: true
  },
  isMaster: {
    type: Boolean,
    default: false
  },
  myCharacter: {
    type: String,
    required: false
  }
});

const owned: ComputedRef<boolean> = computed(() =>
  props.character.character.uuid === props.myCharacter || props.isMaster
);

function startDrag(evt: DragEvent) {
  if (owned.value && evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('character', props.character.character.uuid);
  }
}

const hp: Ref<number> = ref(props.character.character.hpt);
watch (() => props.character.character.hpt, (val) => hp.value = val);
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #fff4;
  cursor: pointer;
  user-select: none;
}

.no-events {
  pointer-events: none;
}

img {
  width: 100%;
  aspect-ratio: 1 / 1;
}

.grayscale {
  filter: grayscale();
}
</style>
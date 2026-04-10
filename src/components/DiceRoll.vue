<template>
  <div class="d-flex flex-column w-100" :style="inCombat ? 'height: 88vh': ''">
    <div>
      <div v-show="result">
        <div class="d-flex justify-center">
          <v-icon :icon="`mdi-dice-${die1}`" size="100" />
          <v-icon :icon="`mdi-dice-${die2}`" size="100" />
        </div>
        <div class="d-flex justify-center text-h4 font-weight-bold">
          {{ result }}
          <span v-if="mod"> +{{ mod }} = {{ result + Number(mod) }}</span>
        </div>
        <div v-if="result === 12" class="d-flex justify-center text-h5 font-weight-bold">
          GRANDE RÉUSSITE
          <v-icon class="ml-1" icon="mdi-creation" color="yellow" size="30" />
        </div>
        <div v-if="result === 2" class="d-flex justify-center text-h5 font-weight-bold">
          GRAND ÉCHEC
          <v-icon class="ml-1" icon="mdi-emoticon-cry-outline" color="blue" size="30" />
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn text="Roll" @click="roll" />
      </div>
    </div>
    <div v-if="inCombat" class="flex-grow-1 overflow-y-auto ps-2">
      <div v-for="(roll, index) in rollHistory" class="my-1" :key="index">
        {{ roll.characterId }} a obtenu un 
        <b :class="roll.value < 7 ? 'text-red-lighten-1' : 'text-green-lighten-1' ">{{ roll.value }}</b>
        <v-icon v-if="roll.value === 12" class="ml-1" icon="mdi-creation" color="yellow" size="20" />
        <v-icon v-if="roll.value === 2" class="ml-1" icon="mdi-emoticon-cry-outline" color="blue" size="20" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { webSocketService } from '@/services/instances/webSocketService.instance';

const props = defineProps({
  characterName: String,
  inCombat: Boolean,
  mod: Number
})

const die1: Ref<number> = ref(0);
const die2: Ref<number> = ref(0);

function roll(): void {
  die1.value = Math.floor(Math.random() * 6 + 1);
  die2.value = Math.floor(Math.random() * 6 + 1);
  if (props.inCombat) {
    webSocketService.rollDice(props.characterName!, result.value)
  }
}

const result = computed(() => die1.value + die2.value)

const rollHistory = computed(() => webSocketService.getRoom().value?.rolls)
</script>

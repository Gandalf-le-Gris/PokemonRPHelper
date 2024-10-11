<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <div class="map-grid">
        <template v-for="(row, i) in room?.map" :key="i">
          <battle-map-tile
            v-for="(_, j) in row"
            :key="j"
            :i
            :j
          />
        </template>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { webSocketService } from '@/services/instances/webSocketService.instance';

const room = webSocketService.getRoom();

const gridTemplate: ComputedRef<string> = computed(() => 
  `repeat(${room.value?.map.length}, 1fr)`
);
</script>

<style scoped>
.map-grid {
  display: grid;
  grid-template-columns: v-bind(gridTemplate);
}
</style>

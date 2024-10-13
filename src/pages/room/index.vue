<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-card
        title="Rejoindre ou créer une salle"
        class="px-4 pb-4 pt-2 mb-8"
        rounded="lg"
      >
        <v-row class="mt-n2">
          <v-col cols="12" sm="6" class="d-flex flex-column justify-end">
            <v-btn
              @click="createRoom"
              text="Créer"
              class="w-100"
            />
          </v-col>
          <v-col cols="12" sm="6" class="d-flex flex-column">
            <v-text-field
              @keypress.enter="joinRoom"
              v-model="roomId"
              hide-details
              label="Code de la salle"
              density="compact"
              variant="outlined"
              class="mb-2"
            />
            <v-btn
              @click="joinRoom"
              text="Rejoindre"
              :disabled="!roomId.match(/^\d{6}$/g)"
              class="w-100"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { webSocketService } from '@/services/instances/webSocketService.instance';

const router = useRouter();

const roomId: Ref<string> = ref('');

onMounted(() => {
  if (webSocketService.getRoom().value?.uuid) {
    router.push(`/room/${webSocketService.getRoom().value?.uuid}`);
  } else {
    webSocketService.connect();
  }
});

async function createRoom() {
  webSocketService.do(webSocketService.createRoom);
}

async function joinRoom() {
  if (roomId.value.match(/^\d{6}$/g)) {
    webSocketService.joinRoom(roomId.value);
  }
}

watch(() => webSocketService.getRoom().value?.uuid, (val) => {
  router.push(`/room/${val}`);
});
</script>

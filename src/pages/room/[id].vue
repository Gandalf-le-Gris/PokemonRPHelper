<template>
  <div v-if="!justArrived" class="fill-height pa-4 ma-0">
    <v-navigation-drawer
      v-if="character"
      v-model="showSheet"
      location="right"
      temporary
      width="1200"
    >
      <div class="d-flex flex-column">
        <v-btn
          @click="showSheet = false"
          icon="mdi-close"
          elevation="0"
          size="x-large"
          density="compact"
          class="ma-2"
        />
        <PokemonSheet
          v-if="character"
          v-model="character"
          :is-player-sheet="!isMaster"
          is-battle-sheet
          @saved="updateCharacter"
        />
      </div>
    </v-navigation-drawer>
    <v-btn
      v-if="character"
      @click="showSheet = true"
      icon="mdi-chevron-left"
      class="rounded-s-pill position-absolute right-0"
      style="z-index: 1"
    />
    <BattleMap
      @update-character="updateCharacter"
      v-model="character"
      :is-master
      :my-character="character?.uuid"
    />
  </div>

  <v-dialog
    v-model="justArrived"
    max-width="800"
  >
    <v-card
      rounded="lg"
      title="Connexion comme"
      class="pa-2 pt-0"
    >
      <v-row dense class="mt-n2">
        <v-col cols="12" sm="6" class="d-flex flex-column justify-end">
          <v-btn
            @click="connectAsDM"
            text="Maître du jeu"
            class="w-100"
          />
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column">
          <v-select
            v-model="character"
            :items="characters"
            return-object
            item-value="uuid"
            item-title="name"
            hide-details
            no-data-text="Aucun Pokémon enregistré"
            variant="outlined"
            label="Personnage"
            density="compact"
            class="mb-2"
          />
          <v-btn
            @click="connectAsPlayer(false)"
            text="Joueur"
            :disabled="!character"
            class="w-100"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { webSocketService } from '@/services/instances/webSocketService.instance';
import { Character } from '@/types/pokemon';

const justArrived: Ref<boolean> = ref(true);
const isMaster: Ref<boolean | undefined> = ref();
const character: Ref<Character | undefined> = ref();
const characters: Ref<Character[]> = ref([]);
const showSheet: Ref<boolean> = ref(false);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  webSocketService.connectThen(() => {
    characters.value = Object.values(JSON.parse(localStorage.getItem('saved-characters') ?? '{}'));
    if (!webSocketService.getRoom().value?.uuid) {
      webSocketService.joinRoom((route.params as { id: string }).id);
    }
    const reconnect = JSON.parse(localStorage.getItem('room-connection') ?? '{}')[(route.params as { id: string }).id];
    if (reconnect && (reconnect.isMaster || reconnect.character)) {
      if (reconnect.isMaster) {
        connectAsDM();
      } else {
        character.value = reconnect.character;
        connectAsPlayer(true);
      }
    }
  });
});

function connectAsDM() {
  isMaster.value = true;
  character.value = undefined;
  justArrived.value = false;
  const connection: any = {};
  connection[(route.params as { id: string }).id] = { isMaster: true };
  localStorage.setItem('room-connection', JSON.stringify(connection));
}

function connectAsPlayer(reconnecting: boolean) {
  isMaster.value = false;
  justArrived.value = false;
  if (!reconnecting) {
    webSocketService.addCharacter(character.value!, !isMaster.value);
  }
  const savedCharacters = JSON.parse(localStorage.getItem('saved-characters') ?? '{}');
  character.value = savedCharacters[character.value?.uuid ?? ''];
  updateCharacter();
  const connection: any = {};
  connection[(route.params as { id: string }).id] = { character: character.value };
  localStorage.setItem('room-connection', JSON.stringify(connection));
}

watch(() => justArrived.value, (val) => {
  if (!val && isMaster.value === undefined) {
    webSocketService.leaveRoom();
  }
});

watch(() => webSocketService.getRoom().value?.uuid, (val) => {
  if (!val) {
    router.push('/room');
  }
});

function updateCharacter() {
  const battleCharacter = webSocketService.getRoom().value?.characters.find(c => c.character.uuid === character.value?.uuid);
  if (battleCharacter) {
    webSocketService.updateCharacter({
      ...battleCharacter,
      character: character.value!
    });
  }
}
</script>

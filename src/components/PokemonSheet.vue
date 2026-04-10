<template>
  <v-card rounded="lg">
    <PokemonSheetHeader
      v-model="character"
      :is-player-sheet="isPlayerSheet"
      :is-battle-sheet="isBattleSheet"
      :regenerate-loading="regenerateLoading"
      @update-species="updateSpecies"
      @regenerate="regenerateCharacter"
      @save="saveCharacter(true)"
      @confirm-reset="confirmReset = true"
    />
    <v-card-text>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <PokemonSheetStats
            v-model="character"
            :character-mods="characterMods"
            @update-level="updateLevel"
          />
          <PokemonSheetSpecificities :specificities="alteredSpecificities" />
          <PokemonSheetAttacks
            v-model="character"
            :attack-types="attackTypes"
            @open-status-dialog="openStatusDialog"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <PokemonSheetTalents
            v-model="character"
            :character-mods="characterMods"
          />
        </v-col>
      </v-row>
      <PokemonSheetIQSkills
        v-if="character.iqSkills.length"
        v-model="character"
        @iq-change="triggerIqChange"
      />
      <PokemonSheetInventory v-model="character" />
      <PokemonSheetExperience
        v-if="isPlayerSheet"
        v-model="character"
        @level-up="levelUp"
      />
      <v-row>
        <v-col>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>
                Mes notes
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-textarea
                  v-model="character.notes"
                  hide-details
                  no-resize
                  rows="25"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-dialog v-model="showStatusDialog" max-width="600">
    <v-card
      title="Capacités de statut"
      rounded="xl"
      class="py-4"
    >
      <template #append>
        <TypeImage :type="character.attacks[selectedStatus].type ?? 'normal'"/>
      </template>
      <template
        v-for="i in [1, 2, 3]"
        :key="i"
      >
        <template v-if="statusMoves[character.attacks[selectedStatus].type ?? 'normal'][i].length">
          <v-divider v-if="i > 1" class="my-4"/>
          <span class="text-body-1 font-weight-bold my-2 ml-6">Rang {{ i }}</span>
          <v-btn
            v-for="move in statusMoves[character.attacks[selectedStatus].type ?? 'normal'][i]"
            :key="move"
            @click="selectStatusMove(move)"
            tile
            elevation="0"
            class="text-body-2 auto-height py-1"
          >
            <span class="status-move-btn">{{ move }}</span>
          </v-btn>
        </template>
      </template>
    </v-card>
  </v-dialog>

  <ConfirmCancelDialog
    v-model="confirmReset"
    @confirm="resetCharacter"
    title="Réinitialiser la fiche ?"
  />

  <v-dialog
    v-model="showTypeChange"
    max-width="300"
    persistent
  >
    <v-card
      :title="`Changement de type ${typeChangeIndex + 1}`"
      rounded="xl"
      class="py-4"
    >
      <v-card-text>
        <v-row
          dense
          align="center"
        >
          <v-col class="d-flex justify-center">
            <TypeImage :type="alteredTypes[typeChangeIndex]" defensive open-on-click/>
          </v-col>
          <v-col cols="auto">
            <v-icon icon="mdi-arrow-right-bold" />
          </v-col>
          <v-col class="d-flex justify-center">
            <v-select
              v-model="newType"
              :items="attackTypes.filter(t => !alteredTypes.includes(t.type))"
              item-value="type"
              item-title="title"
              hide-details
              density="compact"
              variant="outlined"
              @update:model-value="changeType"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showSpecificityChange"
    max-width="500"
    persistent
  >
    <v-card
      :title="`Changement de spécificité`"
      rounded="xl"
      class="py-4"
    >
      <template #append>
        <v-btn
          icon="mdi-content-save"
          variant="flat"
          class="mt-n4"
          :disabled="(!oldSpecificity && !hideOldSpecificity) || !newSpecificity"
          @click="changeSpecificities"
        />
      </template>
      <v-card-text>
        <v-row
          dense
          align="center"
        >
          <v-col class="d-flex justify-center">
            <v-tooltip
              v-if="!hideOldSpecificity"
              location="bottom"
              :disabled="!oldSpecificity"
              :text="specificityArray.find(s => s.value === oldSpecificity)?.desc"
              max-width="512"
              open-on-click
            >
              <template #activator="{ props }">
                <v-select
                  v-model="oldSpecificity"
                  :items="specificityArray.filter(s => character.specificities.includes(s.value))"
                  item-value="value"
                  item-title="title"
                  hide-details
                  density="compact"
                  variant="outlined"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="auto">
            <v-icon icon="mdi-arrow-right-bold" />
          </v-col>
          <v-col class="d-flex justify-center">
            <v-tooltip
              location="bottom"
              :disabled="!newSpecificity"
              :text="specificityArray.find(s => s.value === newSpecificity)?.desc"
              max-width="512"
              open-on-click
            >
              <template #activator="{ props }">
                <v-select
                  v-model="newSpecificity"
                  :items="specificityArray.filter(s => !character.specificities.includes(s.value))"
                  item-value="value"
                  item-title="title"
                  hide-details
                  density="compact"
                  variant="outlined"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showNewAbility"
    max-width="500"
    persistent
  >
    <v-card
      title="Gain de talent"
      rounded="xl"
      class="py-4"
    >
      <template #append>
        <v-btn
          icon="mdi-content-save"
          variant="flat"
          class="mt-n4"
          :disabled="!newAbility"
          @click="learnAbility"
        />
      </template>
      <v-card-text>
        <v-tooltip
          location="bottom"
          :disabled="!newAbility"
          :text="newAbility?.desc"
          max-width="512"
          open-on-click
        >
          <template #activator="{ props }">
            <v-select
              v-model="newAbility"
              :items="availableAbilities"
              return-object
              item-title="title"
              hide-details
              density="compact"
              variant="outlined"
              v-bind="props"
            />
          </template>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { snackbarService } from '@/services/instances/snackbarService.instance';
import { typeService } from '@/services/instances/typeService.instance';
import { Ability, abilityRecord } from '@/types/abilities';
import { changeSpecies, createCharacter, type Character } from '@/types/pokemon';
import { computeGlobalModifiers, specificityArray, SpecificityType, type Mod } from '@/types/specificities';
import statusMoves from '@/types/statusMoves';
import { Type, TypeDetail } from '@/types/types';
import { ModelRef } from 'vue';

const props = defineProps<{
  isPlayerSheet?: boolean
  isBattleSheet?: boolean
}>();

const character: ModelRef<Character> = defineModel<Character>({required: true});
const regenerateLoading: Ref<boolean> = ref<boolean>(false);
const showStatusDialog: Ref<boolean> = ref<boolean>(false);
const selectedStatus: Ref<number> = ref<number>(-1);
const confirmReset: Ref<boolean> = ref<boolean>(false);
const showTypeChange: Ref<boolean> = ref<boolean>(false);
const typeChangeIndex: Ref<number> = ref<number>(0);
const newType: Ref<Type | undefined> = ref();
const oldSpecificity: Ref<SpecificityType | undefined> = ref();
const newSpecificity: Ref<SpecificityType | undefined> = ref();
const currentIqSkill: Ref<number> = ref<number>(0);
const showSpecificityChange: Ref<boolean> = ref<boolean>(false);
const hideOldSpecificity: Ref<boolean> = ref<boolean>(false);
const newAbility: Ref<Ability | undefined> = ref();
const showNewAbility: Ref<boolean> = ref<boolean>(false);
const saveTimeout: Ref<number> = ref<number>(-1);

const characterMods: ComputedRef<Mod> = computed<Mod>(() => computeGlobalModifiers(character.value));

const emit = defineEmits(['saved']);

const attackTypes: ComputedRef<TypeDetail[]> = computed(() =>
  typeService.typeList.value.filter(e => e.type !== 'stellar' && e.type !== 'unknown').sort((a, b) => a.title.localeCompare(b.title))
);

const alteredTypes: ComputedRef<Type[]> = computed(() => {
  const types: Type[] = [...character.value.pokemon.types];
  if (character.value.swappedTypes) {
    Object.values(character.value.swappedTypes).forEach(([index, type]) => types[index] = type);
  }
  return types;
});

function triggerIqChange(index: number) {
  if (character.value.swappedTypes?.[index]) {
    delete character.value.swappedTypes[index];
  }
  if (character.value.swappedSpecificities?.[index]) {
    delete character.value.swappedSpecificities[index];
  }
  if (!character.value.iqSkills.some(iq => iq.value === 'Versatile')) {
    delete character.value.extraAbility;
  }
  newType.value = undefined;
  oldSpecificity.value = undefined;
  newSpecificity.value = undefined;
  newAbility.value = undefined;
  hideOldSpecificity.value = false;
  currentIqSkill.value = index;
  switch (character.value.iqSkills[index].value) {
    case 'Type change':
      showTypeChange.value = true;
      typeChangeIndex.value = 1;
      break;
    case 'Advanced type change':
      showTypeChange.value = true;
      typeChangeIndex.value = 0;
      break;
    case 'Capable':
      showSpecificityChange.value = true;
      break;
    case 'Advanced capable':
      showSpecificityChange.value = true;
      hideOldSpecificity.value = true;
      break;
    case 'Versatile':
      showNewAbility.value = true;
      break;
  }
}

function changeType() {
  if (!character.value.swappedTypes) {
    character.value.swappedTypes = {};
  }
  character.value.swappedTypes[currentIqSkill.value] = [typeChangeIndex.value, newType.value!];
  showTypeChange.value = false;
}

const alteredSpecificities: ComputedRef<SpecificityType[]> = computed(() => {
  const specificities: SpecificityType[] = [...character.value.specificities];
  if (character.value.swappedSpecificities) {
    Object.values(character.value.swappedSpecificities).forEach(([old, specificity]) => {
      const i = specificities.indexOf(old);
      if (i >= 0) {
        specificities.splice(i, 1);
      }
      specificities.push(specificity);
    });
  }
  return specificities;
});

function changeSpecificities() {
  if (!character.value.swappedSpecificities) {
    character.value.swappedSpecificities = {};
  }
  character.value.swappedSpecificities[currentIqSkill.value] = [oldSpecificity.value!, newSpecificity.value!];
  showSpecificityChange.value = false;
}

const availableAbilities: ComputedRef<Ability[]> = computed(() => {
  const allAvailable = Object.values(abilityRecord[alteredTypes.value[0]]);
  if (alteredTypes.value.length > 1) {
    allAvailable.push(...Object.values(abilityRecord[alteredTypes.value[1]]));
  }
  return allAvailable.filter(a => character.value.ability.value !== a.value);
});

function learnAbility() {
  character.value.extraAbility = newAbility.value;
  showNewAbility.value = false;
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  const saved = JSON.parse(localStorage.getItem('saved-characters') ?? '{}');
  if (saved[character.value.uuid]) {
    saveCharacter(false);
  }
  window.removeEventListener('keydown', handleKeyPress);
});

async function regenerateCharacter() {
  regenerateLoading.value = true;
  character.value = await createCharacter(character.value.pokemon, character.value.level);
  regenerateLoading.value = false;
}

async function updateSpecies() {
  setTimeout(() => changeSpecies(character.value), 0);
}

function saveCharacter(showSnackbar: boolean) {
  if (props.isPlayerSheet) {
    const saved = JSON.parse(localStorage.getItem('saved-characters') ?? '{}');
    saved[character.value.uuid] = JSON.parse(JSON.stringify(character.value));
    localStorage.setItem('saved-characters', JSON.stringify(saved));
    localStorage.setItem('last-saved', JSON.stringify(character.value.uuid));
  }
  emit('saved', character.value);
  if (showSnackbar) {
    snackbarService.setSuccess('Sauvegardé');
  }
}

async function resetCharacter() {
  character.value = await createCharacter(character.value.pokemon, 0, character.value.uuid);
}

function updateLevel() {
  character.value.level = Number(character.value.level);
  while (character.value.level / 5 > character.value.iqSkills.length) {
    character.value.iqSkills.push({ value: 'Not learned', title: 'Pas encore appris', desc: 'Pas encore appris', level: 1 });
  }
  while (character.value.level / 5 < character.value.iqSkills.length) {
    character.value.iqSkills.pop();
  }
}

function levelUp() {
  character.value.experience = {
    dungeonClear: false,
    exploration: false,
    fail: false,
    success: false,
    friend: false,
    ko: character.value.experience.ko - (character.value.experience.ko >= 5 ? 5 : 0),
    help: false,
  };
  character.value.level++;
  updateLevel();
}

function openStatusDialog(index: number) {
  selectedStatus.value = index;
  showStatusDialog.value = true;
}

function selectStatusMove(move: string) {
  character.value.attacks[selectedStatus.value].detail = move;
  showStatusDialog.value = false;
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    saveCharacter(true);
  }
}

watch(() => character.value, () => {
  clearTimeout(saveTimeout.value);
  saveTimeout.value = setTimeout(() => {
    const saved = JSON.parse(localStorage.getItem('saved-characters') ?? '{}');
    if (saved[character.value.uuid] || character.value.level) {
      saveCharacter(false);
    }
  }, 1000);
}, { deep: true });
</script>

<style scoped>
.status-move-btn {
  max-width: 800px;
  line-break: auto;
  text-wrap: wrap;
}
</style>

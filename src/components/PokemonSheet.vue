<template>
  <v-card rounded="lg">
    <v-card-title class="mb-8">
      <v-row align="center">
        <v-col>
          <v-row align="center">
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="character.name"
                label="Nom"
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="7">
              <v-row>
                <v-col cols="12" sm>
                  <v-autocomplete
                    @update:modelValue="character.variety = 0; updateSpecies()"
                    v-model="character.species"
                    :items="searchArray"
                    item-value="value"
                    item-title="title"
                    label="Espèce"
                    hide-details
                    no-data-text="Aucun Pokémon trouvé"
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="varieties.length > 1">
                  <v-select
                    @update:modelValue="updateSpecies"
                    v-model="character.variety"
                    :items="varieties"
                    item-value="value"
                    item-title="title"
                    label="Variante"
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm>
              <v-sheet
                rounded="lg"
                class="bg-grey-darken-3 pa-2"
              >
                <v-tooltip location="top" max-width="512" :text="character.ability.desc" open-on-click>
                  <template #activator="{ props }">
                    <div class="text-subtitle-1 text-center" v-bind="props">
                      <span class="text-subtitle-2">Talent : </span>
                      {{ character.ability.title }}
                    </div>
                  </template>
                </v-tooltip>
              </v-sheet>
            </v-col>
            <v-col cols="auto" class="d-flex flex-column">
              <TypeImage :type="character.pokemon.types[0]" defensive open-on-click/>
              <TypeImage v-if="character.pokemon.types[1]" :type="character.pokemon.types[1]" defensive open-on-click class="mt-2"/>
            </v-col>
            <v-col v-if="!isPlayerSheet" class="d-flex justify-end">
              <v-btn
                @click="regenerateCharacter"
                icon="mdi-refresh"
                density="compact"
                variant="plain"
                size="x-large"
                :loading="regenerateLoading"
              />
            </v-col>
            <v-col v-else class="d-flex justify-end">
              <v-btn
                @click="confirmReset = true"
                icon="mdi-refresh"
                density="compact"
                variant="plain"
                size="x-large"
              />
              <v-btn
                @click="saveCharacter"
                icon="mdi-content-save"
                density="compact"
                variant="plain"
                size="x-large"
              />
            </v-col>
            <v-col v-if="$vuetify.display.xs" cols="auto" class="d-flex justify-center">
              <v-sheet
                border="md grey-darken-3"
                rounded="lg"
                max-width="80"
              >
                <v-img :src="character.pokemon.sprites.front_default" width="80"/>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="$vuetify.display.smAndUp" cols="12" sm="auto" class="d-flex justify-center align-center">
          <v-sheet
            border="md grey-darken-3"
            rounded="xl"
            max-width="128"
          >
            <v-img :src="character.pokemon.sprites.front_default" width="128"/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-row align="center" class="mb-4">
            <v-col>
              <v-text-field
                v-model="character.level"
                @update:model-value="updateLevel"
                type="number"
                label="Niveau"
                hide-details
                density="compact"
                variant="outlined"
                min="0"
                class="font-weight-bold"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="character.hpt"
                label="PV"
                type="number"
                hide-details
                density="compact"
                variant="outlined"
                min="0"
                :max="maxHP"
                class="inner-compact font-weight-bold"
              >
                <template #append-inner>
                  {{ `/${maxHP}` }}
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row v-for="stat in statsArray" :key="stat.value" class="ma-0" align="center">
            <v-col>
              <v-progress-linear
                v-model="character.stats[stat.value]"
                :buffer-value="character.stats[stat.value] + (characterMods.stats?.[stat.value] ?? 0)"
                buffer-opacity=".5"
                height="25"
                :max="maxStat"
                color="grey-darken-3"
              >
                {{ `${stat.title} : ${character.stats[stat.value] + (characterMods.stats?.[stat.value] ?? 0)}${characterMods.stats?.[stat.value] ? ` (+${characterMods.stats?.[stat.value]})` : ''}` }}
              </v-progress-linear>
            </v-col>
            <v-col cols="auto">
              <v-row>
                <v-btn
                  icon="mdi-plus"
                  tile
                  size="xs"
                  @click="character.stats[stat.value]++"
                />
              </v-row>
              <v-row>
                <v-btn
                  icon="mdi-minus"
                  tile
                  size="xs"
                  @click="character.stats[stat.value] = Math.max(character.stats[stat.value] - 1, 0)"
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12">
              <v-sheet
                rounded="lg"
                class="bg-grey-darken-3 pa-2"
              >
                <v-row>
                  <v-col class="text-subtitle-1 text-center ma-0">
                    Spécificités
                  </v-col>
                </v-row>
                <v-row v-for="specificity in character.specificities" :key="specificity" class="mx-0 my-n3">
                  <v-col>
                    <v-tooltip location="top" :text="specificityArray.find(s => s.value === specificity)?.desc" open-on-click>
                      <template #activator="{ props }">
                        <span v-bind="props">
                          {{ specificityArray.find(s => s.value === specificity)?.title }}
                        </span>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12">
              <v-sheet
                rounded="lg"
                class="bg-grey-darken-3 pa-2"
              >
                <v-row>
                  <v-col class="text-subtitle-1 text-center ma-0">
                    Attaques
                  </v-col>
                </v-row>
                <v-row align="center" v-for="(_, index) in character.attacks" :key=index dense>
                  <v-col v-if="!character.attacks[index].type" cols="4">
                    <v-select
                      v-model="character.attacks[index].type"
                      :items="attackTypes"
                      item-value="type"
                      item-title="title"
                      hide-details
                      density="compact"
                      variant="outlined"
                      :label="`Type ${index + 1}`"
                      :menu="autoOpen === index"
                    />
                  </v-col>
                  <v-col v-else cols="auto">
                    <type-image
                      @click="character.attacks[index].type = undefined; autoOpen = index"
                      :type="character.attacks[index].type!"
                      offensive
                      class="cursor-pointer"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="character.attacks[index].detail"
                      :label="`Attaque ${index + 1}`"
                      hide-details
                      density="compact"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      v-show="character.attacks[index].type"
                      @click="openStatusDialog(index)"
                      icon="mdi-help-circle"
                      density="compact"
                      color="transparent"
                      elevation="0"
                    />
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row v-for="(talent, index) in talentArray" :key="talent.value" align="center" class="mx-0 my-n5">
            <v-col>
              {{ talent.title }}
            </v-col>
            <v-col cols="auto">
              <v-text-field
                v-if="((characterMods.talents?.find(e => e.name === talent.value)?.mod ?? 0) < 1000) && (character.ability.value !== 'Healer' || talent.value !== 'Heal')"
                v-model="character.talents[index].mod"
                type="number"
                width="84"
                hide-details
                density="compact"
                min="0"
                class="inner-compact"
              >
                <template #append-inner v-if="characterMods.talents?.find(e => e.name === talent.value)?.mod">
                  {{ `+${characterMods.talents?.find(e => e.name === talent.value)?.mod}` }}
                </template>
              </v-text-field>
              <v-text-field
                v-else
                width="84"
                hide-details
                density="compact"
                prepend-inner-icon="mdi-check"
                disabled
                class="text-success v-field__disabled-opacity-100"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="character.iqSkills.length" class="mt-8">
        <v-col>
          <v-sheet
            rounded="lg"
            class="bg-grey-darken-3 pa-2"
          >
            <v-row>
              <v-col class="text-subtitle-1 text-center ma-0">
                Compétences de QI
              </v-col>
            </v-row>
            <v-row dense>
              <v-col
                v-for="(_, index) in character.iqSkills"
                :key="index"
                cols="4"
              >
                <v-tooltip location="top" :text="character.iqSkills[index].desc" open-on-click>
                  <template #activator="{ props }">
                    <v-select
                      v-model="character.iqSkills[index]"
                      :label="`Niveau ${(index + 1) * 5}`"
                      hide-details
                      item-value="value"
                      item-title="title"
                      return-object
                      :items="iqSkillArray.filter(s => (s.level <= (index + 1) * 5) && (!character.iqSkills.some((k, i) => k.value === s.value && i !== index)))"
                      v-bind="props"
                    />
                  </template>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="mt-8">
        <v-col cols="12" sm="7">
          <v-textarea
            v-model="character.inventory"
            hide-details
            label="Inventaire"
            no-resize
            rows="10"
          />
        </v-col>
        <v-col cols="12" sm="5" class="d-flex flex-column justify-space-between">
          <v-text-field
            v-model="character.items.held"
            hide-details
            label="Objet tenu"
          />
          <v-text-field
            v-model="character.items.head"
            hide-details
            label="Tête"
            class="mt-2"
          />
          <v-text-field
            v-model="character.items.neck"
            hide-details
            label="Cou"
            class="mt-2"
          />
          <v-text-field
            v-model="character.items.belt"
            hide-details
            label="Ceinture"
            class="mt-2"
          />
        </v-col>
      </v-row>
      <v-row v-if="isPlayerSheet" align="center" class="mt-6">
        <v-col>
          <v-sheet
            rounded="lg"
            class="bg-grey-darken-3 pa-2"
          >
            <v-row>
              <v-col class="text-subtitle-1 text-center ma-0 mb-n3">
                Expérience
              </v-col>
            </v-row>
            <v-row align="center" dense class="mt-4 mx-2">
              <v-col v-for="key in Object.keys(experienceLabels)" :key cols="6" md="3">
                <v-checkbox
                  v-model="character.experience[key as 'ko']"
                  :label="experienceLabels[key as 'ko']"
                  hide-details
                  density="compact"
                />
              </v-col>
              <v-col cols="6" md="3">
                <v-btn
                  @click="levelUp"
                  :disabled="Object.values(character.experience).filter(e => e).length < 4"
                  text="Gain de niveau"
                  prepend-icon="mdi-creation"
                  rounded="lg"
                />
              </v-col>
            </v-row>
          </v-sheet>
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
</template>

<script setup lang="ts">
import { typeService } from '@/services/instances/typeService.instance';
import { experienceLabels } from '@/types/experience';
import { iqSkillArray } from '@/types/iqSkills';
import { changeSpecies, computeHPT, createCharacter } from '@/types/pokemon';
import { StatName, statsArray, type Character } from '@/types/pokemon';
import { searchArray } from '@/types/search';
import { computeGlobalModifiers } from '@/types/specificities';
import { specificityArray, type Mod } from '@/types/specificities';
import statusMoves from '@/types/statusMoves';
import { talentArray } from '@/types/talents';
import { TypeDetail } from '@/types/types';
import { getVarieties } from '@/utils/varieties';
import { ModelRef } from 'vue';

defineProps({
  isPlayerSheet: Boolean
});

const character: ModelRef<Character> = defineModel<Character>({required: true});
const regenerateLoading: Ref<boolean> = ref<boolean>(false);
const autoOpen: Ref<number> = ref<number>(-1);
const showStatusDialog: Ref<boolean> = ref<boolean>(false);
const selectedStatus: Ref<number> = ref<number>(-1);
const confirmReset: Ref<boolean> = ref<boolean>(false);

const characterMods: ComputedRef<Mod> = computed<Mod>(() => computeGlobalModifiers(character.value));
const maxHP: ComputedRef<number> = computed<number>(() => computeHPT(character.value));

const emit = defineEmits(['saved']);

const maxStat: ComputedRef<number> = computed<number>(() => {
  return Object.entries(character.value.stats).reduce((acc, x) => {
    if (!characterMods.value.stats) {
      return acc > x[1] ? acc : x[1]
    }
    const stat = x[0] as StatName;
    return acc > (x[1] + characterMods.value.stats[stat]) ? acc : (x[1] + characterMods.value.stats[stat]);
  }, 0)
});

const varieties: ComputedRef<{ value: number, title: string }[]> = computed(() =>
  getVarieties(character.value)
);

const attackTypes: ComputedRef<TypeDetail[]> = computed(() =>
  typeService.typeList.filter(e => e.type !== 'stellar' && e.type !== 'unknown').sort((a, b) => a.title.localeCompare(b.title))
);

async function regenerateCharacter() {
  regenerateLoading.value = true;
  autoOpen.value = -1;
  character.value = await createCharacter(character.value.pokemon, character.value.level);
  regenerateLoading.value = false;
}

async function updateSpecies() {
  setTimeout(() => changeSpecies(character.value), 0);
}

function saveCharacter() {
  const saved = JSON.parse(localStorage.getItem('saved-characters') ?? '{}');
  saved[character.value.uuid] = JSON.parse(JSON.stringify(character.value));
  localStorage.setItem('saved-characters', JSON.stringify(saved));
  localStorage.setItem('last-saved', JSON.stringify(character.value.uuid));
  emit('saved');
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
    ko: false,
    help: false,
  }
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
</script>

<style scoped>
.status-move-btn {
  max-width: 800px;
  line-break: auto;
  text-wrap: wrap;
}
</style>

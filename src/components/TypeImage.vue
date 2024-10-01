<template>
  <div>
    <v-img v-if="!offensive && !defensive" :src="detail?.src" :width/>

    <v-tooltip v-else location="top" :open-on-click>
      <template #activator="{ props }">
        <v-img :src="detail?.src" :width v-bind="props"/>
      </template>
      <template v-if="defensive">
        <div class="text-center text-subtitle-2 mb-2">Résistances</div>
        <v-row v-if="detail?.defensive.ineffective.length" align="center" dense class="mt-n2">
          <v-col cols="auto">
            <v-icon
              color="green-darken-4"
              icon="mdi-close"
              size="large"
            />
          </v-col>
          <v-col cols="auto" v-for="t in detail?.defensive.ineffective" :key="t">
            <type-image
              :type="t"
              width="60"
              class="ml-n1"
            />
          </v-col>
        </v-row>
        <v-row v-if="detail?.defensive.strong.length" align="center" dense class="mt-n2">
          <v-col cols="auto">
            <v-icon
              color="green-darken-4"
              icon="mdi-chevron-double-up"
              size="large"
            />
          </v-col>
          <v-col cols="auto" v-for="t in detail?.defensive.strong" :key="t">
            <type-image
              :type="t"
              width="60"
              class="ml-n1"
            />
          </v-col>
        </v-row>
        <v-row v-if="detail?.defensive.weak.length" align="center" dense class="mt-n2">
          <v-col cols="auto">
            <v-icon
              color="red-darken-4"
              icon="mdi-chevron-double-down"
              size="large"
            />
          </v-col>
          <v-col cols="auto" v-for="t in detail?.defensive.weak" :key="t">
            <type-image
              :type="t"
              width="60"
              class="ml-n1"
            />
          </v-col>
        </v-row>
      </template>
      <template v-else-if="offensive">
        <div class="text-center text-subtitle-2 mb-2">Efficacité</div>
        <v-row v-if="detail?.offensive.strong.length" align="center" dense class="mt-n2">
          <v-col cols="auto">
            <v-icon
              color="green-darken-4"
              icon="mdi-chevron-double-up"
              size="large"
            />
          </v-col>
          <v-col cols="auto" v-for="t in detail?.offensive.strong" :key="t">
            <type-image
              :type="t"
              width="60"
              class="ml-n1"
            />
          </v-col>
        </v-row>
        <v-row v-if="detail?.offensive.weak.length" align="center" dense class="mt-n2">
          <v-col cols="auto">
            <v-icon
              color="red-darken-4"
              icon="mdi-chevron-double-down"
              size="large"
            />
          </v-col>
          <v-col cols="auto" v-for="t in detail?.offensive.weak" :key="t">
            <type-image
              :type="t"
              width="60"
              class="ml-n1"
            />
          </v-col>
        </v-row>
        <v-row v-if="detail?.offensive.ineffective.length" align="center" dense class="mt-n2">
          <v-col cols="auto">
            <v-icon
              color="red-darken-4"
              icon="mdi-close"
              size="large"
            />
          </v-col>
          <v-col cols="auto" v-for="t in detail?.offensive.ineffective" :key="t">
            <type-image
              :type="t"
              width="60"
              class="ml-n1"
            />
          </v-col>
        </v-row>
      </template>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { typeService } from '@/services/instances/typeService.instance';
import { Type, TypeDetail } from '@/types/types';
import { PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<Type>,
    required: true
  },
  width: {
    type: String,
    default: "80"
  },
  offensive: {
    type: Boolean,
    default: false
  },
  defensive: {
    type: Boolean,
    default: false
  },
  openOnClick: {
    type: Boolean,
    default: false
  }
});

const detail: Ref<TypeDetail | undefined> = ref();

onMounted(reloadSrc);
watch(() => props.type, reloadSrc);

async function reloadSrc() {
  detail.value = await typeService.getOrFetchTypeDetail(props.type);
}
</script>

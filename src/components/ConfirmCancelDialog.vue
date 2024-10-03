<script setup lang="ts">
import type { ModelRef } from 'vue';

defineProps({
  title: {
    type: String,
    default: "Êtes-vous sûr(e) ?"
  }
})

const model: ModelRef<boolean> = defineModel({ required: true });
const emit = defineEmits(['confirm', 'cancel']);

function confirm() {
  model.value = false;
  emit('confirm');
}

function cancel() {
  model.value = false;
  emit('cancel');
}
</script>

<template>
  <v-dialog
        v-model="model"
        persistent
        max-width="512"
  >
    <v-card
          :title
          rounded="lg"
    >
      <template #actions>
        <v-btn
              @click="cancel"
              text="Annuler"
        />
        <v-btn
              @click="confirm"
              text="Confirmer"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

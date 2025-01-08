<script setup lang="ts">
import actionStore from '@/actionStore';
import { ref } from 'vue';

const showAddNewDialog = ref(false)
const actionName = ref('')
const emit = defineEmits(['actions-updated'])

function onSubmit (): void {
  actionStore.addAction({ Label: actionName.value })
  actionName.value = ''
  showAddNewDialog.value = false
  emit('actions-updated')
}
</script>

<template>
  <q-btn color="secondary" icon="add" label="New Action" @click="showAddNewDialog = true" />
  <q-dialog v-model="showAddNewDialog" transition-show="slide-up" transition-hide="slide-down" maximized>
      <q-card>
          <q-btn color="red" icon="close" label="Close" @click="showAddNewDialog = false" />
          <q-form @submit="onSubmit">
            <q-input
              filled
              v-model="actionName"
              label="Action name"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-btn label="Add action" type="submit" color="primary"/>
          </q-form>
      </q-card>
  </q-dialog>
</template>

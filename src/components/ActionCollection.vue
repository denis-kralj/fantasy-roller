<script setup lang="ts">
import { ref } from 'vue'
import actionStore from '@/actionStore'

const actions = ref(actionStore.getActions())
const isFormHidden = ref(true)
const actionName = ref('')

function createActionButtonClickHandler() {
  actionStore.addAction({ Label: actionName.value })
  actionName.value = ''
  isFormHidden.value = true
  actions.value = actionStore.getActions()
}

function removeActionButtonClickHandler(actionId: string) {
  actionStore.removeAction({ Id: actionId })
  actions.value = actionStore.getActions()
}
</script>

<template>
  <h2>Actions</h2>
  <ul>
    <li v-for="action in actions">
      {{ action.Label }}
      <button @click="removeActionButtonClickHandler(action.Id)">Delete</button>
    </li>
  </ul>
  <div>
    <button @click="isFormHidden = false" v-if="isFormHidden">Add new action</button>
    <div v-if="!isFormHidden">
      <input v-model="actionName" placeholder="Enter your action name" />
      <button @click="createActionButtonClickHandler">Add action</button>
      <button @click="isFormHidden = true">Close form</button>
    </div>
  </div>
</template>

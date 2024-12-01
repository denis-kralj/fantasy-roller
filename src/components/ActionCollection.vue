<script setup lang="ts">
import { ref } from 'vue'
import actionStore from '../actionStore'

const actions = ref(actionStore.getActions())

let isFormHidden = ref(true)
let actionName = ref('')

function createAction(event) {
  actionStore.addAction({ Label: actionName.value })
  actionName.value = ''
  isFormHidden.value = true
  actions.value = actionStore.getActions()
}
</script>

<template>
  <div>Actions</div>
  <ul>
    <li v-for="action in actions">
      {{ action.Label }}
    </li>
  </ul>
  <div>
    <button @click="isFormHidden = false" v-if="isFormHidden">Add new action</button>
    <div v-if="!isFormHidden">
      <input v-model="actionName" placeholder="Enter your action name" />
      <button @click="createAction">Add action</button>
      <button @click="isFormHidden = true">Close form</button>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import actionStore from '@/actionStore'
import AddActionDialog from './AddActionDialog.vue'
import ActionComponent from './ActionComponent.vue'

const actions = ref(actionStore.getActions())

function actionsUpdatedEvent() {
    actions.value = actionStore.getActions()
}
</script>

<template>
    <h2>Actions</h2>
    <q-list bordered separator v-for="action in actions" :key="action.Id">
        <ActionComponent @actions-updated="actionsUpdatedEvent" :action="action" />
    </q-list>
    <AddActionDialog @actions-updated="actionsUpdatedEvent" />
</template>

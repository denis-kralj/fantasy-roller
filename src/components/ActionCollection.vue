<script setup lang="ts">
import { ref } from 'vue'
import Action from './ActionComponent.vue'
import actionStore from '@/actionStore'
import AddActionDialog from './AddActionDialog.vue'

const actions = ref(actionStore.getActions())

function actionsUpdatedEvent() {
    actions.value = actionStore.getActions()
}
</script>

<template>
    <h2>Actions</h2>
    <ul>
        <li v-for="action in actions" :key="action.Id">
            <Action @actions-updated="actionsUpdatedEvent" :action="action" />
        </li>
    </ul>
    <AddActionDialog @actions-updated="actionsUpdatedEvent" />
</template>

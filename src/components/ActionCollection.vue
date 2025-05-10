<script setup lang="ts">
import { ref } from 'vue'
import dataStore from '@/dataStore'
import ActionDialog from './ActionDialog.vue'
import ActionComponent from './ActionComponent.vue'
import ImportExportComponent from './ImportExportComponent.vue'

const actions = ref(dataStore.getActions())

function actionsUpdatedEvent() {
    actions.value = dataStore.getActions()
}
</script>

<template>
    <q-page-container>
        <h2>Actions</h2>
        <q-list bordered separator v-for="action in actions" :key="action.Id">
            <ActionComponent @actions-updated="actionsUpdatedEvent" :action="action" />
        </q-list>
        <ActionDialog @actions-updated="actionsUpdatedEvent" />
        <ImportExportComponent />
    </q-page-container>
</template>

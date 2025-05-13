<script setup lang="ts">
import dataStore from '@/dataStore'
import importExportDataManager from '@/importExportDataManager'
import clientTools from '@/clientTools'
import { ref } from 'vue'
import toastManager from '@/toastManager'

const confirm = ref(false)

function importFileContentHandler(content: string): void {
    try {
        const dataWithId = importExportDataManager.validateAndParseImportExportActions(content)
        const actionsToImport = importExportDataManager.mapToActions(dataWithId)
        dataStore.setActions(actionsToImport)
        toastManager.showSuccessToast('Actions imported successfully')
    } catch (error) {
        toastManager.showErrorToast(`Error on import: ${(error as Error).message}`)
    }
}

function handleImport(): void {
    clientTools.openFileDialog(document, 'file', '.json', importFileContentHandler)
}
function handleExport(): void {
    const data = dataStore.getActions()
    const exportData = importExportDataManager.mapToImportExportActions(data)
    clientTools.downloadToClientAsJsonFile(exportData, document, 'actions.json')
}
</script>

<template>
    <q-btn label="import" @click="confirm = true" icon="download" color="yellow" />
    <q-btn label="export" @click="handleExport" icon="upload" color="green" />
    <q-dialog v-model="confirm" persistent color="black">
        <q-card style="background-color: black">
            <q-card-section class="row items-center">
                <q-avatar icon="download" color="negative" text-color="black" />
                <span class="q-ml-sm"
                    >Are you sure you want to import your actions? This will REPLACE ALL EXISTING
                    ACTIONS!</span
                >
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Import" color="negative" v-close-popup @click="handleImport" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { Notify } from 'quasar'
import type { Action } from '@/action'
import dataStore, { type DataStore } from '@/dataStore'
import { v4 as guid } from 'uuid'
import { ref } from 'vue'

const confirm = ref(false)

type ExportedAction = {
    Label: string
    Elements: ExportedElement[]
}

type ExportedElement = {
    Label: string
    Value: string
}

function addIdentifiersToActions(actions: ExportedAction[]): Action[] {
    return actions.map((action) => {
        return {
            Label: action.Label,
            Id: guid(),
            Elements: action.Elements.map((element) => {
                return {
                    Label: element.Label,
                    Value: element.Value,
                    Id: guid(),
                }
            }),
        }
    })
}

function stripIdBeforeExport(dataStore: DataStore): ExportedAction[] {
    const data = dataStore.getActions()
    return data.map((action) => {
        return {
            Label: action.Label,
            Elements: action.Elements.map((element) => {
                return {
                    Label: element.Label,
                    Value: element.Value,
                }
            }),
        }
    })
}

function isExportedAction(action: unknown): action is ExportedAction {
    return (
        typeof action === 'object' &&
        action !== null &&
        'Label' in action &&
        'Elements' in action &&
        Array.isArray(action.Elements)
    )
}

function readerOnLoad(event: ProgressEvent<FileReader>): void {
    try {
        const content = event.target?.result as string
        if (content) {
            const data: ExportedAction[] = JSON.parse(content)
            if (!Array.isArray(data) || !data.every(isExportedAction)) {
                Notify.create({
                    message: 'File is not an array or is not the right element type in array',
                    color: 'negative',
                    position: 'top',
                })
                return
            }
            const dataWithId = addIdentifiersToActions(data)
            dataStore.setActions(dataWithId)
            Notify.create({
                message: 'Import successful',
                color: 'positive',
                position: 'top',
            })
            return
        }
    } catch (error) {
        Notify.create({
            message: `Invalid file format: ${error}`,
            color: 'negative',
            position: 'top',
        })
    }
}

function fileSelectHandler(event: Event): void {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length === 1) {
        const reader = new FileReader()
        reader.onload = readerOnLoad
        reader.readAsText(target.files[0])
    }
}

function openFileDialog(
    document: Document,
    type: string,
    accept: string,
    fileSelectHandler: (event: Event) => void,
): void {
    const fileInput = document.createElement('input')
    fileInput.type = type
    fileInput.accept = accept
    fileInput.onchange = fileSelectHandler
    fileInput.click()
}

function downloadToClientAsJsonFile<T>(data: T, document: Document): void {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'actions.json'
    a.click()
    URL.revokeObjectURL(url)
}

function handleImport(): void {
    openFileDialog(document, 'file', '.json', fileSelectHandler)
}
function handleExport(): void {
    const data = stripIdBeforeExport(dataStore)
    downloadToClientAsJsonFile(data, document)
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

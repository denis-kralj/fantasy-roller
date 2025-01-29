<script setup lang="ts">
import type { ActionElement } from '@/action'
import actionStore from '@/actionStore'
import { cloneDeep } from '@/helpers'
import { ref } from 'vue'
import { v4 as guid } from 'uuid'

const props = defineProps(['action'])
const showAddNewDialog = ref(false)
const actionId = ref(props.action?.Id ?? '')
const actionName = ref(cloneDeep(props.action?.Label ?? ''))
const actionElements = ref(cloneDeep(props.action?.Elements ?? []))
const emit = defineEmits(['actions-updated'])

const submitButtonLabel = actionId.value ? 'Save action' : 'Add action'
const openDialogButtonLabel = actionId.value ? '' : 'New Action'
const openDialogButtonIcon = actionId.value ? 'edit' : 'add'

function onSubmit(): void {
    if (actionId.value) {
        actionStore.updateAction({
            Label: actionName.value,
            Id: actionId.value,
            Elements: actionElements.value,
        })
    } else {
        actionStore.addAction({ Label: actionName.value, Elements: actionElements.value })
        actionName.value = ''
        actionElements.value = []
    }
    showAddNewDialog.value = false
    emit('actions-updated')
}

function onClose(): void {
    actionElements.value = cloneDeep(props.action?.Elements ?? [])
    actionName.value = cloneDeep(props.action?.Label ?? '')
    showAddNewDialog.value = false
}

function handleRemoveClick(id: string): void {
    actionElements.value = actionElements.value.filter(
        (element: ActionElement) => element.Id !== id,
    )
}
</script>

<template>
    <q-btn
        color="secondary"
        :icon="openDialogButtonIcon"
        :label="openDialogButtonLabel"
        @click="showAddNewDialog = true"
    />
    <q-dialog
        v-model="showAddNewDialog"
        transition-show="slide-up"
        transition-hide="slide-down"
        maximized
    >
        <q-card>
            <q-btn color="red" icon="close" label="Close" @click="onClose" />
            <q-form @submit="onSubmit">
                <q-input
                    filled
                    v-model="actionName"
                    label="Action name"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                />
                <q-list>
                    <q-item v-for="element in actionElements" :key="element.Id">
                        <q-item-section>
                            <q-input
                                v-model="element.Label"
                                label="Label"
                                lazy-rules
                                :rules="[
                                    (val) => (val && val.length > 0) || 'Please type something',
                                ]"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-input
                                v-model="element.Value"
                                label="Value"
                                lazy-rules
                                :rules="[
                                    (val) => (val && val.length > 0) || 'Please type something',
                                ]"
                            />
                        </q-item-section>
                        <q-item-section side>
                            <q-btn icon="delete" @click="handleRemoveClick(element.Id)" />
                        </q-item-section>
                    </q-item>
                </q-list>
                <div>
                    <q-btn
                        color="primary"
                        icon="add"
                        label="Add Element Entry"
                        @click="actionElements.push({ Label: '', Value: '', Id: guid() })"
                    />
                </div>
                <br /><br />
                <q-btn :label="submitButtonLabel" type="submit" color="primary" />
            </q-form>
        </q-card>
    </q-dialog>
</template>

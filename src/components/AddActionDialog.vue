<script setup lang="ts">
import actionStore from '@/actionStore'
import { ref } from 'vue'

const props = defineProps(['action'])
const showAddNewDialog = ref(false)
const actionId = ref(props.action?.Id ?? '')
const actionName = ref(JSON.parse(JSON.stringify(props.action?.Label ?? '')))
const actionElements = ref(JSON.parse(JSON.stringify(props.action?.Elements ?? [])))
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
    actionElements.value = JSON.parse(JSON.stringify(props.action?.Elements ?? []))
    actionName.value = JSON.parse(JSON.stringify(props.action?.Label ?? ''))
    showAddNewDialog.value = false
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
                    <q-item v-for="(element, index) in actionElements" :key="index">
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
                            <q-btn icon="delete" @click="actionElements.splice(index, 1)" />
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-btn
                    color="primary"
                    icon="add"
                    label="Add Element Entry"
                    @click="actionElements.push({ Label: '', Value: '' })"
                />
                <q-btn :label="submitButtonLabel" type="submit" color="primary" />
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import type { Action, ActionElement } from '@/action'
import dataStore from '@/dataStore'
import { cloneDeep } from '@/helpers'
import { computed, ref } from 'vue'
import { v4 as guid } from 'uuid'
import { stringMaxLength, stringMinLength } from '@/validators'

const props = defineProps<{ action?: Action }>()

const showAddNewDialog = ref(false)
const actionId = ref(props.action?.Id ?? '')
const actionName = ref(props.action?.Label ?? '')
const actionElements = ref(cloneDeep(props.action?.Elements ?? []))
const emit = defineEmits(['actions-updated'])
const existingActionNames = dataStore.getActions().map((a) => ({ Label: a.Label, Id: a.Id }))

const sameNameWarningMessage = computed(() => {
    return existingActionNames.some((a) => a.Label === actionName.value && a.Id !== actionId.value)
        ? `An action with the name '${actionName.value}' is already present`
        : ''
})

const hasSameName = computed(() => {
    return sameNameWarningMessage.value !== ''
})

const submitButtonLabel = actionId.value ? 'Save action' : 'Add action'
const openDialogButtonLabel = actionId.value ? '' : 'New Action'
const openDialogButtonIcon = actionId.value ? 'edit' : 'add'

function onSubmit(): void {
    if (actionId.value) {
        dataStore.updateAction({
            Label: actionName.value,
            Id: actionId.value,
            Elements: actionElements.value,
        })
    } else {
        dataStore.addAction({ Label: actionName.value, Elements: actionElements.value })
        actionName.value = ''
        actionElements.value = []
    }
    showAddNewDialog.value = false
    emit('actions-updated')
}

function onClose(): void {
    actionElements.value = cloneDeep(props.action?.Elements ?? [])
    actionName.value = props.action?.Label ?? ''
    actionId.value = props.action?.Id ?? ''
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
                    autofocus
                    :rules="[
                        (val) => stringMinLength(val, 1) || 'Action name is required',
                        (val) => stringMaxLength(val, 48) || 'Action name too long',
                    ]"
                />
                <q-banner
                    v-show="hasSameName"
                    dense
                    rounded
                    :style="{ margin: '0 5px' }"
                    inline-actions
                    class="text-black bg-yellow"
                >
                    {{ sameNameWarningMessage }}
                </q-banner>
                <q-list>
                    <q-item v-for="element in actionElements" :key="element.Id">
                        <q-item-section>
                            <q-input
                                v-model="element.Label"
                                label="Label"
                                autofocus
                                :rules="[
                                    (val) => stringMinLength(val, 1) || 'Element name is required',
                                    (val) => stringMaxLength(val, 48) || 'Element name too long',
                                ]"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-input
                                v-model="element.Value"
                                label="Value"
                                :rules="[
                                    // this rule does nothing except allow the same styling on this
                                    // component as the one rendered right before it (element label)
                                    () => true || '',
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
                        :style="{ marginBottom: '20px', marginTop: '10px' }"
                        @click="actionElements.push({ Label: '', Value: '', Id: guid() })"
                    />
                </div>
                <q-btn :label="submitButtonLabel" type="submit" color="primary" />
            </q-form>
        </q-card>
    </q-dialog>
</template>

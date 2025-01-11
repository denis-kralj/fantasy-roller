<script setup lang="ts">
import actionStore from '@/actionStore'
import { ref } from 'vue'

const props = defineProps(['action'])
const showAddNewDialog = ref(false)
const actionName = ref(props.action?.Label ?? '')
const actionId = ref(props.action?.Id ?? '')
const emit = defineEmits(['actions-updated'])

const submitButtonLabel = actionId.value ? 'Save action' : 'Add action'
const openDialogButtonLabel = actionId.value ? '' : 'New Action'
const openDialogButtonIcon = actionId.value ? 'edit' : 'add'

function onSubmit(): void {
    if (actionId.value) {
        actionStore.updateAction({ Label: actionName.value, Id: actionId.value })
    } else {
        actionStore.addAction({ Label: actionName.value })
        actionName.value = ''
    }
    showAddNewDialog.value = false
    emit('actions-updated')
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
            <q-btn color="red" icon="close" label="Close" @click="showAddNewDialog = false" />
            <q-form @submit="onSubmit">
                <q-input
                    filled
                    v-model="actionName"
                    label="Action name"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                />
                <q-btn :label="submitButtonLabel" type="submit" color="primary" />
            </q-form>
        </q-card>
    </q-dialog>
</template>

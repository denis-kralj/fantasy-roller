<script setup lang="ts">
import { ref } from 'vue'
import actionStore from '@/actionStore'

const props = defineProps(['action'])
const emit = defineEmits(['actions-updated'])

const actionName = ref(props.action.Label)
const isEditing = ref(false)

function removeActionButtonClickHandler() {
    actionStore.removeAction({ Id: props.action.Id })
    emit('actions-updated')
}
function saveActionButtonClickHandler() {
    const updatedAction = {
        Label: actionName.value,
        Id: props.action.Id,
    }
    actionStore.updateAction(updatedAction)
    isEditing.value = false
    emit('actions-updated')
}
</script>

<template>
    <q-item clickable v-show="!isEditing">
        <q-item-section>
            <q-item-label>{{ action.Label }}</q-item-label>
        </q-item-section>
        <q-btn @click="isEditing = true" label="Edit" color="primary" />
        <q-btn @click="removeActionButtonClickHandler" label="Delete" color="negative" />
    </q-item>
    <q-item clickable v-show="isEditing">
        <q-item-section>
            <q-input
                filled
                v-model="actionName"
                label="Action name"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
        </q-item-section>
        <q-btn @click="saveActionButtonClickHandler" label="Save" color="primary" />
        <q-btn @click="isEditing = false" label="Cancel" color="negative" />
    </q-item>
</template>

<style>
.label {
    padding: 10px;
}
</style>

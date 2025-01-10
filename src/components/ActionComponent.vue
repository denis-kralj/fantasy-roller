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
    actionStore.updateAction({ Label: actionName.value, Id: props.action.Id })
    isEditing.value = false
    emit('actions-updated')
}
</script>

<template>
    <div v-show="!isEditing">
        <span class="label" v-show="!isEditing">{{ actionName }}</span>
        <button @click="isEditing = true">Edit</button>
        <button @click="removeActionButtonClickHandler">Delete</button>
    </div>
    <div v-show="isEditing">
        <input v-model="actionName" placeholder="Enter your action name" />
        <button @click="saveActionButtonClickHandler">Save</button>
        <button @click="isEditing = false">Cancel</button>
    </div>
</template>

<style>
.label {
    padding: 10px;
}
</style>

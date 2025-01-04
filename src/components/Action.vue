<script setup lang="ts">
import { ref } from 'vue';
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
    props.action.Label = actionName
    actionStore.updateAction(props.action)
    isEditing.value = false
    emit('actions-updated')
}
</script>

<template>
    <div>
        <span class="label" v-if="!isEditing">{{ actionName }}</span>
        <input v-if="isEditing" v-model="actionName" placeholder="Enter your action name" />
        <button v-if="!isEditing" @click="isEditing = true">Edit</button>
        <button v-if="isEditing" @click="saveActionButtonClickHandler">Save</button>
        <button v-if="isEditing" @click="isEditing = false">Cancel</button>
        <button v-if="!isEditing" @click="removeActionButtonClickHandler">Delete</button>
    </div>
</template>

<style>
.label {
    padding: 10px
}
</style>
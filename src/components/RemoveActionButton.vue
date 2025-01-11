<script lang="ts" setup>
import actionStore from '@/actionStore'
import { ref } from 'vue'

const props = defineProps<{ actionId: string }>()
const emit = defineEmits(['actions-updated'])
const confirm = ref(false)

function removeActionConfirmButtonClicked() {
    actionStore.removeAction({ Id: props.actionId })
    emit('actions-updated')
}
</script>

<template>
    <q-btn @click="confirm = true" icon="delete" color="negative" />
    <q-dialog v-model="confirm" persistent color="black">
        <q-card style="background-color: black">
            <q-card-section class="row items-center">
                <q-avatar icon="delete" color="negative" text-color="black" />
                <span class="q-ml-sm">Are you sure you want to delete this action?</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                    flat
                    label="Delete"
                    color="negative"
                    v-close-popup
                    @click="removeActionConfirmButtonClicked"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

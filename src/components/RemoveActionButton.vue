<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits(['action-delete-requested'])
const confirm = ref(false)
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
                    @click="emit('action-delete-requested')"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" setup>
import dataStore from '@/dataStore'
import { ref } from 'vue'

const confirm = ref(false)

const emit = defineEmits(['outcomes-updated'])

const clearOutcomes = () => {
    dataStore.clearOutcomes()
    confirm.value = false
    emit('outcomes-updated')
}
</script>

<template>
    <q-btn
        class="floating-top-right"
        color="red"
        @click="confirm = true"
        icon="delete"
        round
        unelevated
    />

    <q-dialog v-model="confirm" persistent>
        <q-card :style="{ background: 'var(--color-background)' }">
            <q-card-section class="row items-center">
                <q-avatar icon="delete" color="red" text-color="white" />
                <span class="q-ml-sm"
                    >Are you sure you want to remove your entire roll history?</span
                >
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                    flat
                    label="Clear Roll History"
                    color="primary"
                    @click="clearOutcomes()"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<style scoped>
.floating-top-right {
    position: fixed;
    top: 48px;
    right: 18px;
    z-index: 1000;
}
</style>

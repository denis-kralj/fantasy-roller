<script lang="ts" setup>
import dataStore from '@/dataStore'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const confirm = ref(false)
const isRootPage = ref(false)
watch(
    () => route.path,
    (newPath) => {
        if (newPath === '/') {
            isRootPage.value = true
        } else {
            isRootPage.value = false
        }
    },
)
</script>

<template>
    <q-btn
        class="q-mt-md"
        color="red"
        label="Clear Outcomes"
        @click="confirm = true"
        icon="delete"
        v-if="isRootPage"
    />

    <q-dialog v-model="confirm" persistent>
        <q-card>
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
                    @click="dataStore.clearOutcomes()"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

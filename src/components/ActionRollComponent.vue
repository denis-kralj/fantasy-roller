<script setup lang="ts">
import { ref, computed } from 'vue'
import dataStore from '@/dataStore'
import { actionToOutcome } from '@/actionExecutor'
import type { Action } from '@/action'

const actions = dataStore.getActions()

const outcomes = ref(dataStore.getOutcomes())

const handleClick = (action: Action) => {
    const outcome = actionToOutcome(action)
    dataStore.addOutcome(outcome)
    outcomes.value = dataStore.getOutcomes() // Refresh outcomes
    console.log(`Outcome stored: ${outcome.Title} (Timestamp: ${outcome.Timestamp})`)
}

const chatMessages = computed(() => {
    return outcomes.value.map((outcome) => {
        const textArray = Object.entries(outcome.Data).map(([key, value]) => `${key}: ${value}`)
        return {
            text: textArray,
            timestamp: new Date(outcome.Timestamp).toLocaleString(),
            user: outcome.Title,
        }
    })
})
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-drawer show-if-above :persistent="true" :behavior="'desktop'" :style="{ width: '10%' }">
            <q-list>
                <q-item
                    v-for="action in actions"
                    :key="action.Id"
                    clickable
                    v-ripple
                    @click="handleClick(action)"
                >
                    <q-item-section>
                        <q-item-label>{{ action.Label }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <q-page class="q-pa-md">
                <div>
                    <div class="chat-container">
                        <q-chat-message
                            v-for="message in chatMessages"
                            :key="message.timestamp"
                            :text="message.text"
                            :timestamp="message.timestamp"
                            :name="message.user"
                        />
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.chat-container {
    max-height: 94vh; /* Adjust as needed */
    overflow-y: auto;
}
</style>

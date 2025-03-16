<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import dataStore from '@/dataStore'
import { actionToOutcome } from '@/actionExecutor'
import type { Action } from '@/action'

const actions = dataStore.getActions()

const outcomes = ref(dataStore.getOutcomes())
const chatContainer = ref<null | HTMLDivElement>(null)

const handleClick = async (action: Action) => {
    const outcome = actionToOutcome(action)
    dataStore.addOutcome(outcome)
    outcomes.value = dataStore.getOutcomes() // Refresh outcomes
    console.log(`Outcome stored: ${outcome.Title} (Timestamp: ${outcome.Timestamp})`)
    await nextTick()
    scrollToBottom()
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

const scrollToBottom = () => {
    if (chatContainer.value) {
        console.log(JSON.stringify(chatContainer.value))
        chatContainer.value.scrollTo({
            top: chatContainer.value.scrollHeight,
            behavior: 'smooth',
        })
    }
}

onMounted(() => {
    scrollToBottom()
})
</script>

<template>
    <q-drawer show-if-above :persistent="true" :behavior="'desktop'" :width="150">
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
                <div class="chat-container" ref="chatContainer">
                    <!-- TODO: do a relative time here later on -->
                    <q-chat-message
                        v-for="message in chatMessages"
                        :key="message.timestamp"
                        :text="message.text"
                        :stamp="message.timestamp"
                        :name="message.user"
                    />
                </div>
            </div>
        </q-page>
    </q-page-container>
</template>

<style scoped>
.chat-container {
    max-height: 90vh; /* TODO: do this better later on */
    overflow-y: auto;
}
</style>

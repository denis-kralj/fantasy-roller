<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import dataStore from '@/dataStore'
import { actionToOutcome } from '@/actionExecutor'
import type { Action } from '@/action'
import ClearOutcomesButtonComponent from './ClearOutcomesButtonComponent.vue'
import RollChatMessage from './RollChatMessage.vue'
import type { Outcome } from '@/outcome'

const actions = dataStore.getActions()

const outcomes = ref(dataStore.getOutcomes())
const chatContainer = ref<null | HTMLDivElement>(null)

const handleClick = async (action: Action) => {
    const outcome = actionToOutcome(action)
    dataStore.addOutcome(outcome)
    outcomes.value = dataStore.getOutcomes() // Refresh outcomes
    await nextTick()
    scrollToBottom()
}

const chatMessages = computed(() => {
    return outcomes.value.map((outcome: Outcome) => {
        return {
            data: outcome.Data,
            timestamp: new Date(outcome.Timestamp).toLocaleString(),
            title: outcome.Title,
        }
    })
})

const scrollToBottom = () => {
    if (chatContainer.value) {
        chatContainer.value.scrollTo({
            top: chatContainer.value.scrollHeight,
            behavior: 'smooth',
        })
    }
}

function outcomesUpdatedEvent() {
    outcomes.value = dataStore.getOutcomes()
}

onMounted(() => {
    scrollToBottom()
})
</script>

<template>
    <q-drawer
        show-if-above
        :persistent="true"
        :behavior="'desktop'"
        :width="150"
        :style="{ background: 'var(--color-background)' }"
    >
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

    <ClearOutcomesButtonComponent @outcomes-updated="outcomesUpdatedEvent" />

    <q-page-container>
        <q-page class="q-pa-md">
            <div>
                <div class="chat-container" ref="chatContainer">
                    <RollChatMessage
                        v-for="message in chatMessages"
                        :key="message.timestamp"
                        :message="message"
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

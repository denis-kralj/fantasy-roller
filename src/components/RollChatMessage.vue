<script setup lang="ts">
import type { InterpretationResult } from '@/roller/roller'
import RollDetailsTooltip from './RollDetailsTooltip.vue'

const { message } = defineProps<{
    message: {
        data: Record<string, InterpretationResult>
        timestamp: string
        title: string
    }
}>()
</script>

<template>
    <!-- TODO: do a relative time here later on (3 hours ago, 2 weeks ago etc...) -->
    <q-chat-message :stamp="message.timestamp" :name="message.title">
        <div
            v-for="(interpretationResult, label) in message.data"
            :key="label"
            style="margin-bottom: 4px"
        >
            <span>
                {{
                    interpretationResult.success
                        ? `${label}: ${interpretationResult.rollResult.result}`
                        : `${label}: ${interpretationResult.expression}`
                }}
                <q-tooltip v-if="interpretationResult.success" anchor="top right" self="top left">
                    <RollDetailsTooltip
                        :rolls="interpretationResult.rollResult.rolls"
                        :expression="interpretationResult.expression"
                    />
                </q-tooltip>
            </span>
        </div>
    </q-chat-message>
</template>

<script setup lang="ts">
import type { InterpretationResult } from '@/roller/roller'
import RollDetailsTooltip from './RollDetailsTooltip.vue'

const { message } = defineProps<{
    message: {
        data: Record<string, InterpretationResult>
        timestamp: string
        user: string
    }
}>()
</script>

<template>
    <q-chat-message :stamp="message.timestamp" :name="message.user">
        <template #default>
            <div v-for="(line, idx) in message.data" :key="idx" style="margin-bottom: 4px">
                <span>
                    {{
                        line.success
                            ? `${idx}: ${line.rollResult.result}`
                            : `${idx}: ${line.expression}`
                    }}
                    <q-tooltip v-if="line.success">
                        <RollDetailsTooltip
                            :rolls="line.rollResult.rolls"
                            :expression="line.expression"
                        />
                    </q-tooltip>
                </span>
            </div>
        </template>
    </q-chat-message>
</template>

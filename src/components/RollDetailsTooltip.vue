<script setup lang="ts">
const { rolls, expression } = defineProps<{
    rolls: { dice: string; result: number }[]
    expression: string
}>()
</script>
<template>
    <div>
        <span v-if="rolls.length">
            <strong>{{ expression }} => </strong>
            {{ `${rolls.map((r) => `(${r.dice}->${r.result})`).join(', ')}` }}
        </span>
    </div>
</template>

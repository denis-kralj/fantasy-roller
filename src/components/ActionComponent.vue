<script setup lang="ts">
import AddActionDialog from './AddActionDialog.vue'
import RemoveActionButton from './RemoveActionButton.vue'
import type { Action } from '@/action'

const props = defineProps<{ action: Action }>()
const emit = defineEmits(['actions-updated'])
</script>

<template>
    <q-item clickable>
        <q-item-section>
            <q-item-label>{{ action.Label }}</q-item-label>
        </q-item-section>
        <AddActionDialog @actions-updated="emit('actions-updated')" :action />
        <RemoveActionButton
            @actions-updated="emit('actions-updated')"
            :action-id="props.action.Id"
        />
    </q-item>
</template>

<style>
.label {
    padding: 10px;
}
</style>

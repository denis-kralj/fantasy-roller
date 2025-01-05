<script setup lang="ts">
import { ref } from 'vue';

const showAddNewDialog = ref(false)
</script>

<template>
    <q-btn color="secondary" icon="add" label="New Action" @click="showAddNewDialog = true" />
    <q-dialog v-model="showAddNewDialog" transition-show="slide-up" transition-hide="slide-down" maximized>
        <q-card>
            <q-btn color="red" icon="close" label="Close" @click="showAddNewDialog = false" />
        </q-card>
    </q-dialog>
</template>
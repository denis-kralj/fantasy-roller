<script setup lang="ts">
import FantasyRoller from './components/FantasyRoller.vue'
import ActionCollection from './components/ActionCollection.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <FantasyRoller msg="Let's get rollin'!" />
    </div>
  </header>
  <main>
    <ActionCollection />
  </main>
</template>

<style scoped></style>

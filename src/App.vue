<template>
    <nav>
        <RouterLink to="/"><q-btn color="primary" icon="home" /></RouterLink>
        <RouterLink to="/manage"><q-btn color="secondary" icon="settings" /></RouterLink>
    </nav>
    <main>
        <RouterView />
    </main>
</template>

<style scoped></style>

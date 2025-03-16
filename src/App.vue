<template>
    <q-layout view="hHh lpR fFf">
        <q-header>
            <nav>
                <RouterLink to="/"><q-btn color="primary" icon="home" /></RouterLink>
                <RouterLink to="/manage"><q-btn color="secondary" icon="settings" /></RouterLink>
            </nav>
        </q-header>
        <main>
            <RouterView />
        </main>
    </q-layout>
</template>

<style scoped></style>

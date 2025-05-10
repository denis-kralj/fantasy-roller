import './assets/main.css'
import { createWebHistory, createRouter } from 'vue-router'
import ActionCollection from './components/ActionCollection.vue'

import { createApp } from 'vue'
import App from './App.vue'
import { Notify, Quasar } from 'quasar'

import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import ActionRollComponent from './components/ActionRollComponent.vue'

// keep in sync with the value in vite.config.ts
const baseUrl = '/fantasy-roller/'

const routes = [
    { path: '/manage', component: ActionCollection },
    { path: '/', component: ActionRollComponent },
]

const router = createRouter({
    history: createWebHistory(baseUrl),
    routes,
})

const myApp = createApp(App).use(router)

myApp.use(Quasar, {
    plugins: {
        Notify,
    },
})

myApp.mount('#app')

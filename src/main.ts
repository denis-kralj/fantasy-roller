import './assets/main.css'
import { createWebHistory, createRouter } from 'vue-router'
import ActionCollection from './components/ActionCollection.vue'

import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'

import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import ActionRollComponent from './components/ActionRollComponent.vue'

const routes = [
    { path: '/manage', component: ActionCollection },
    { path: '/', component: ActionRollComponent },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const myApp = createApp(App).use(router)

myApp.use(Quasar, {
    plugins: {},
})

myApp.mount('#app')

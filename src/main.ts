import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: { Notify }
})

myApp.mount('#app')

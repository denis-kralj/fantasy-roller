import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'

import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}
})

myApp.mount('#app')

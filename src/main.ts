import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'

import 'quasar/src/css/index.sass'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}
})

myApp.mount('#app')

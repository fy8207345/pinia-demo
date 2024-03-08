import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueApp from "@/VueApp.vue";

const app = createApp(VueApp)

app.use(createPinia())

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './stores'

const app = createApp(App).use(pinia)

app.mount('#app')

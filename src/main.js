import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from  './views/Home.vue'
import Receiver from  './views/Receiver.vue'
import Interpreter1 from  './views/Interpreter1.vue'
import Interpreter2 from  './views/Interpreter2.vue'

const routes = [
  // { path: '/', component: Home },
  { path: '/', component: Receiver },
  { path: '/interpreter1', component: Interpreter1 },
  { path: '/interpreter2', component: Interpreter2 },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)


app.use(router)
app.mount('#app')

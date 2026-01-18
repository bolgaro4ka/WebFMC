import MCPage from '@/pages/MCPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: MCPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,

})

export default router

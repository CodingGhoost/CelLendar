import { createRouter, createWebHistory } from "vue-router";

import LoginVue from '@/views/Login.vue'
import CalendarVue from '@/views/Calendar.vue'

const routes = [
  {
    path: '/',
    // redirect: '/login',
    component: CalendarVue
  },

  {
    path: '/login',
    component: LoginVue
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;
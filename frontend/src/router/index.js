import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue';




const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView  // Set LoginView as the default route
  },
 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
  
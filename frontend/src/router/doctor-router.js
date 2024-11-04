import { createRouter, createWebHistory } from 'vue-router'
import doctorDashboard from '../userRole/doctor/views/doctorDashboard.vue';

const routes = [
    {
        path: '/doctor/dashboard',
        name: 'doctorDashboard',
        component: doctorDashboard,
      },
  ]
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router
  
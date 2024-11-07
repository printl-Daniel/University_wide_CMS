import { createRouter, createWebHistory } from 'vue-router'
import staff_dashBoard from '../userRole/staff/views/staff_dashBoard.vue';

const routes = [
    {
        path: '/staff/dashboard',
        name: 'staff_dashBoard',
        component: staff_dashBoard,
      },
    
  ]
  
  const staff_router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default staff_router
  
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import staff_dashBoard from '../userRole/staff/views/staff_dashBoard.vue';
import inventory from '../userRole/staff/views/inventory.vue';
import doctorDashboard from '../userRole/doctor/views/doctorDashboard.vue';
import adminDashboard from '../userRole/admin/views/admindDashboard.vue';


// Define routes for login and staff dashboard
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView  // Set LoginView as the default route
  },

  //staff-router
  {
    path: '/staff/dashboard',
    name: 'staff_dashBoard',
    component: staff_dashBoard,
  },
  {
    path: '/staff/inventory',
    name: 'inventory',
    component: inventory,
  },

  {
    path: '/doctor/dashboard',
    name: 'doctorDashboard',
    component: doctorDashboard,
  },


  //admin-router
  {
    path: '/admin/dashboard',
    name: 'adminDashboard',
    component: adminDashboard,
  }

];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

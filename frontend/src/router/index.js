import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import OTP from "../views/auth/VerifyOTP.vue";
import reset from "../views/auth/resetPassword.vue";

// Staff
import staff_dashBoard from "../userRole/staff/views/staff_dashBoard.vue";
import inventory from "../userRole/staff/views/manage_inventory.vue";
import patientRecords from "../userRole/staff/views/patientRecords.vue";

// Admin
import adminDashboard from "../userRole/admin/views/admindDashboard.vue";
import userManagement from "@/userRole/admin/views/userManagement.vue";
import adminInventory from "../userRole/admin/views/manage_inventory.vue";
import appointments from "../userRole/admin/views/appointments.vue";
import enrollment from "../userRole/admin/views/studentEnrollment.vue";
import history from "../userRole/admin/views/viewHistory.vue";
import audit from "../userRole/admin/views/viewAudit.vue";
import addItemModal from "@/userRole/admin/views/addItemModal.vue";
import Feedback from "../userRole/admin/views/feedback.vue";
import disburse from "../userRole/admin/views/viewDisbursed.vue";
import updateItem from "@/userRole/admin/views/updateItem.vue";
import archive from "../userRole/admin/views/archive.vue";
// Doctor
import patientHistory from "@/userRole/doctor/views/patientHistory.vue";
import doctorDashboard from "../userRole/doctor/views/doctorDashboard.vue";

// Patient
import patientInbox from "../userRole/patient/views/inbox.vue";
import sendMail from "../userRole/patient/views/sendMail.vue";
import sent from "../userRole/patient/views/sent.vue";

// Error Page
import ErrorPage from "../components/Error.vue"; 

// Define routes
const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/token",
    name: "otpVerification",
    component: OTP,
  },
  {
    path: "/reset-password",
    name: "reset",
    component: reset,
  },
  // Staff routes
  {
    path: "/staff/dashboard",
    name: "staff_dashBoard",
    component: staff_dashBoard,
    meta: { requiresAuth: true, roles: ['Staff'] },
  },
  {
    path: "/staff/inventory",
    name: "inventory",
    component: inventory,
    meta: { requiresAuth: true, roles: ['Staff'] },
  },
  {
    path: "/staff/patient-records",
    name: "patientRecords",
    component: patientRecords,
    meta: { requiresAuth: true, roles: ['Staff'] },
  },
  // Doctor routes
  {
    path: "/doctor/dashboard",
    name: "doctorDashboard",
    component: doctorDashboard,
    meta: { requiresAuth: true, roles: ['Doctor'] },
  },
  {
    path: "/doctor/patient-history",
    name: "patientHistory",
    component: patientHistory,
    meta: { requiresAuth: true, roles: ['Doctor'] },
  },
  // Admin routes
  {
    path: "/admin/dashboard",
    name: "adminDashboard",
    component: adminDashboard,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/admin/view-user",
    name: "user",
    component: userManagement,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/admin/inventory",
    name: "AdminInventory",
    component: adminInventory,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/appointments",
    name: "appointments",
    component: appointments,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/admin/enrollment",
    name: "studentEnrollment",
    component: enrollment,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/admin/history",
    name: "history",
    component: history,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/admin/audit",
    name: "audit",
    component: audit,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/admin/add-item",
    name: "addItem",
    component: addItemModal,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: '/admin/edit-item/:itemId',
    name: 'editItem',
    component: updateItem,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: '/admin/archive',
    name: 'archive',
    component: archive,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
 {
    path: "/feedback",
    name: "feedback",
    component: Feedback,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/admin/view-disbursed",
    name: "disburse",
    component: disburse,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  // Patient routes
  {
    path: "/patient/inbox",
    name: "patientInbox",
    component: patientInbox,
    meta: { requiresAuth: true, roles: ['Patient'] },
  },
  {
    path: "/patient/sendMail",
    name: "sendMail",
    component: sendMail,
    meta: { requiresAuth: true, roles: ['Patient'] },
  },
  {
    path: "/patient/sent",
    name: "sent",
    component: sent,
    meta: { requiresAuth: true, roles: ['Patient'] },
  },
  // Error page route
  {
    path: "/error",
    name: "error",
    component: ErrorPage,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Route guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Retrieve the token
  const isAuthenticated = !!token; // Check if the token exists
  const userRole = JSON.parse(localStorage.getItem('userRole')); // Retrieve user role from local storage

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }); // Redirect to login if not authenticated
  } else if (to.meta.requiresAuth && to.meta.roles) {
    // Check if the user has the required role
    if (!to.meta.roles.includes(userRole)) {
      next({ name: 'error' }); // Redirect to error page if the user does not have the required role
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Proceed to the route if no authentication is required
  }
});

export default router;
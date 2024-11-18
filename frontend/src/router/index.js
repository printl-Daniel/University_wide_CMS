import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
//staff
import staff_dashBoard from "../userRole/staff/views/staff_dashBoard.vue";
import inventory from "../userRole/staff/views/manage_inventory.vue";
import patientRecords from "../userRole/staff/views/patientRecords.vue";

//admin
import adminDashboard from "../userRole/admin/views/admindDashboard.vue";
import manageStaff from "../userRole/admin/views/manageStaff.vue";
import manageDoctor from "../userRole/admin/views/manageDoctor.vue";
import userManagement from "@/userRole/admin/views/userManagement.vue";
//doctor
import patientHistory from "@/userRole/doctor/views/patientHistory.vue";
import doctorDashboard from "../userRole/doctor/views/doctorDashboard.vue";

//patient
import patientDashboard from "../userRole/patient/views/patientDashboard.vue";
import medical from "../userRole/patient/views/certificateRequest.vue";
import feedback from "../userRole/patient/views/feedBack.vue";

// Define routes for login and staff dashboard
const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView, // Set LoginView as the default route
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },

  //staff-router
  {
    path: "/staff/dashboard",
    name: "staff_dashBoard",
    component: staff_dashBoard,
  },
  {
    path: "/staff/inventory",
    name: "inventory",
    component: inventory,
  },

  {
    path: "/staff/patient-records",
    name: "patientRecords",
    component: patientRecords,
  },
  //doctor-router
  {
    path: "/doctor/dashboard",
    name: "doctorDashboard",
    component: doctorDashboard,
  },
  {
    path: "/doctor/patient-history",
    name: "patientHistory",
    component: patientHistory,
  },

  //admin-router
  {
    path: "/admin/dashboard",
    name: "adminDashboard",
    component: adminDashboard,
  },
  {
    path: "/admin/manage-staff",
    name: "manageStaff",
    component: manageStaff,
  },
  {
    path: "/admin/manage-doctor",
    name: "manageDoctor",
    component: manageDoctor,
  },
  {
    path: "/admin/view-user",
    name: "user",
    component: UserManagement,
  },

  //patient
  {
    path: "/patient/dashboard",
    name: "patientDashboard",
    component: patientDashboard,
  },
  {
    path: "/patient/medical",
    name: "certificateRequest",
    component: medical,
  },
  {
    path: "/patient/feedback",
    name: "feedback",
    component: feedback,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

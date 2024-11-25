import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import OTP from "../views/auth/VerifyOTP.vue";
//staff
import staff_dashBoard from "../userRole/staff/views/staff_dashBoard.vue";
import inventory from "../userRole/staff/views/manage_inventory.vue";
import patientRecords from "../userRole/staff/views/patientRecords.vue";

//admin
import adminDashboard from "../userRole/admin/views/admindDashboard.vue";
import userManagement from "@/userRole/admin/views/userManagement.vue";
import adminInventory from "../userRole/admin/views/manage_inventory.vue";

//doctor
import patientHistory from "@/userRole/doctor/views/patientHistory.vue";
import doctorDashboard from "../userRole/doctor/views/doctorDashboard.vue";
import appointments from "../userRole/doctor/views/appointments.vue";

//patient
import patientInbox from "../userRole/patient/views/inbox.vue";
import sendMail from "../userRole/patient/views/sendMail.vue";
import sent from "../userRole/patient/views/sent.vue";
// import feedback from "../userRole/patient/views/feedBack.vue";
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
  {
    path: "/token",
    name: "otpVerification",
    component: OTP,
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
  {
    path: "/appointments",
    name: "appointments",
    component: appointments,
  },
  //admin-router
  {
    path: "/admin/dashboard",
    name: "adminDashboard",
    component: adminDashboard,
  },
  {
    path: "/admin/view-user",
    name: "user",
    component: userManagement,
  },
  {
    path: "/admin/inventory",
    name: "AdminInventory",
    component: adminInventory,
  },

  //patient
  {
    path: "/patient/inbox",
    name: "patientInbox",
    component: patientInbox,
  },
  {
    path: "/patient/senMail",
    name: "sendMail",
    component: sendMail,
  },

  {
    path: "/patient/sent",
    name: "sent",
    component: sent,
  },
  // {
  //   path: "/patient/feedback",
  //   name: "feedback",
  //   component: feedback,
  // },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

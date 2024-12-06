import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import OTP from "../views/auth/VerifyOTP.vue";
import reset from "../views/auth/resetPassword.vue";
//staff
import staff_dashBoard from "../userRole/staff/views/staff_dashBoard.vue";
import inventory from "../userRole/staff/views/manage_inventory.vue";
import patientRecords from "../userRole/staff/views/patientRecords.vue";

//admin
import adminDashboard from "../userRole/admin/views/admindDashboard.vue";
import userManagement from "@/userRole/admin/views/userManagement.vue";
import adminInventory from "../userRole/admin/views/manage_inventory.vue";

import appointments from "../userRole/admin/views/appointments.vue";

import enrollment from "../userRole/admin/views/studentEnrollment.vue";
import history from "../userRole/admin/views/viewHistory.vue";
import audit from "../userRole/admin/views/viewAudit.vue";
import addItemModal from "@/userRole/admin/views/addItemModal.vue";
import DisbursedItem from "../userRole/admin/views/DisburseItem.vue";

//doctor
import patientHistory from "@/userRole/doctor/views/patientHistory.vue";
import doctorDashboard from "../userRole/doctor/views/doctorDashboard.vue";

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
  {
    path:"/reset-password",
    name: "reset",
    component: reset,
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
    path: "/admin/DisburseItem",
    name: "DisbursedItem",
    component: DisbursedItem,
  },
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
  {
    path: "/appointments",
    name: "appointments",
    component: appointments,
  },
  {
    path: "/admin/enrollment",
    name: "studentEnrollment",
    component: enrollment,
  },
  {
    path: "/admin/history",
    name: "history",
    component: history,
  },
  {
    path: "/admin/audit",
    name: "audit",
    component: audit,
  },
  {
    path: "/admin/add-item",
    name: "addItem",
    component: addItemModal,
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

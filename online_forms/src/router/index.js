import { createRouter, createWebHistory } from "vue-router";
import Appointments from "../views/Appointments.vue";
import Feedback from "../views/Feedback.vue";

const routes = [
  {
    path: "/appointments",
    name: "appointments",
    component: Appointments,
  },

  {
    path: "/feedback",
    name: "feedback",
    component: Feedback,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

<template>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"
      integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div class="side-nav">
      <button class="compose-btn" @click="goTo('/admin/dashboard')">
        <i class="fa-solid fa-chart-line"></i>Dashboard
      </button>
      <div class="nav-items">
        <router-link
          class="certificate"
          :class="{ active: isActive('/admin/inventory') }"
          to="/admin/inventory"
        >
          <i class="fa-solid fa-warehouse"></i> Inventory
        </router-link>
        <router-link
          class="certificate"
          :class="{ active: isActive('/admin/view-user') }"
          to="/admin/view-user"
        >
          <i class="fa-solid fa-users"></i> Manage User
        </router-link>
        <router-link
          class="certificate"
          :class="{ active: isActive('/appointments') }"
          to="/appointments"
        >
          <i class="fa-regular fa-calendar-check"></i> Appointments
        </router-link>
        <router-link
          class="certificate"
          :class="{ active: isActive('/feedback') }"
          to="/feedback"
        >
          <i class="fa-solid fa-scroll"></i> Feedback & Evaluation
        </router-link>
      </div>
    </div>
  </body>
</template>
<script>
export default {
  name: "sideNav",
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    isActive(path) {
      return this.$route.path === path;
    },
  },
  mounted() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/nav.css";
    document.head.appendChild(link);
  },
};
</script>

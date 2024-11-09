
<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 250px; height: 100vh;">

    <h5 class="text-primary">Clinic Management</h5>
    <hr />

    <!-- Navigation Links -->
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" v-for="(item, index) in navItems" :key="index">
        <router-link
          :to="item.link"
          class="nav-link"
          :class="{'active': isActive(item.link)}"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>

    <hr />

    <!-- User Profile Section -->
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle d-flex align-items-center"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src="https://via.placeholder.com/30" alt="Profile" class="rounded-circle me-2" />
        {{ userName }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <router-link to="/doctor/profile" class="dropdown-item">Profile</router-link>
        </li>
        <li>
          <router-link to="/logout" class="dropdown-item">Sign out</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoctorSidebar",
  data() {
    return {
      navItems: [
        { title: "Dashboard", link: "/doctor/dashboard" },
        { title: "Patients", link: "/doctor/patients" },
        { title: "Appointments", link: "/doctor/appointments" },
        { title: "Medical History", link: "/doctor/medical-history" },
        { title: "Feedback", link: "/doctor/feedback" },
        { title: "Settings", link: "/doctor/settings" }
      ],
      userName: "Bautista"
    };
  },
  methods: {
    isActive(link) {
      return this.$route.path === link;
    }
  }
};
</script>

<style scoped>
.text-primary {
  font-weight: bold;
}
.nav-link.active {
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
}
</style>
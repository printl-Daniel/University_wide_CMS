<template>
  <div class="side-nav">
    <button class="compose-btn" @click="goTo('/admin/dashboard')">
      <i class="fa-solid fa-chart-line"></i>Dashboard
    </button>

    <div class="nav-items">
      <!-- Inventory with Dropdown -->
      <div class="item">
        <a class="sub-btn">
          <i class="fa-solid fa-warehouse"></i> Inventory
          <i class="fa-solid fa-angle-right dropdown"></i>
        </a>
        <div class="sub-menu">
          <router-link class="sub-item" to="/admin/inventory">
            View Inventory
          </router-link>
          <router-link class="sub-item" to="/admin/add-item">
            Add Inventory
          </router-link>
          <router-link class="sub-item" to="/admin/history">
            View History Log
          </router-link>
          <router-link class="sub-item" to="/admin/DisburseItem">
            Disburse Item
          </router-link>
        </div>
      </div>

      <!-- Manage User -->
      <router-link
        class="certificate"
        :class="{ active: isActive('/admin/view-user') }"
        to="/admin/view-user"
      >
        <i class="fa-solid fa-users"></i> Manage User
      </router-link>

      <!-- Enrollment -->
      <router-link
        class="certificate"
        :class="{ active: isActive('/admin/enrollment') }"
        to="/admin/enrollment"
      >
        <i class="fa-solid fa-scroll"></i> Enrollment
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    isActive(path) {
      return this.$route.path === path;
    },
  },
  mounted() {
    document.querySelectorAll(".sub-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const subMenu = this.nextElementSibling;
        subMenu.classList.toggle("show");
        const dropdownIcon = this.querySelector(".dropdown");
        dropdownIcon.classList.toggle("rotate");
      });
    });
  },
};
</script>

<style scoped>
/* Dropdown Sub-menu */
.sub-menu {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 2rem;
  padding-left: 1rem;
  border-left: 2px solid #dadada;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.3s ease-in-out;
}

/* Show sub-menu */
.sub-menu.show {
  display: flex;
  opacity: 1;
  max-height: 500px; /* Adjust based on your content */
}

/* Sub-menu links */
.sub-menu a {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  color: #212529;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.sub-menu a:hover {
  background-color: #c6f1c6;
}

/* Dropdown icon rotation */
.dropdown {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.dropdown.rotate {
  transform: rotate(90deg);
}
</style>

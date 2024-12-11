<template>
  <div class="side-nav-container">
    <div class="side-nav">
      <button class="compose-btn" @click="goTo('/admin/dashboard')">
        <i class="fas fa-chart-line"></i>
        <span>Dashboard</span>
      </button>

      <div class="nav-items">
        <!-- Inventory with Dropdown -->
        <div class="item">
          <button class="sub-btn" @click="toggleSubmenu('inventory')" :class="{ 'active': activeSubmenu === 'inventory' }">
            <div class="btn-content">
              <i class="fas fa-warehouse"></i>
              <span>Inventory</span>
            </div>
            <i class="fas fa-chevron-right" :class="{ 'rotate': activeSubmenu === 'inventory' }"></i>
          </button>
          <transition name="slide">
            <div class="sub-menu" v-show="activeSubmenu === 'inventory'">
              <router-link class="sub-item" to="/admin/inventory">
                <i class="fas fa-clipboard-list"></i>
                <span>View Inventory</span>
              </router-link>
              <router-link class="sub-item" to="/admin/add-item">
                <i class="fas fa-plus"></i>
                <span>Add Item</span>
              </router-link>
              <router-link class="sub-item" to="/admin/history">
                <i class="fas fa-clock-rotate-left"></i>
                <span>View History Log</span>
              </router-link>
              <router-link class="sub-item" to="/admin/view-disbursed">
                <i class="fas fa-notes-medical"></i>
                <span>Disbursed Log</span>
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Other Nav Items -->
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ 'active': isActive(item.path) }"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "SideNav",
  data() {
    return {
      activeSubmenu: null,
      navItems: [
        { path: "/admin/view-user", label: "Manage User", icon: "fas fa-users" },
        { path: "/appointments", label: "Appointments", icon: "far fa-calendar-check" },
        { path: "/feedback", label: "Feedback & Evaluation", icon: "fas fa-scroll" },
        { path: "/admin/enrollment", label: "Enrollment", icon: "fas fa-scroll" },
      ],
    };
  },
  methods: {
    toggleSubmenu(menu) {
      this.activeSubmenu = this.activeSubmenu === menu ? null : menu;
    },
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
    link.href = "/css/nav.css"; // Adjust the path if necessary
    document.head.appendChild(link);
  },
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>

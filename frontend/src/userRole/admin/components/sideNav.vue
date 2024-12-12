<template>
  <div class="side-nav" :class="{ 'collapsed': isCollapsed }">
    <button class="toggle-btn" @click="toggleSidebar">
      <i :class="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
    </button>
    <div class="nav-content">
      <button class="compose-btn" @click="goTo('/admin/dashboard')">
        <i class="fas fa-chart-line"></i>
        <span v-show="!isCollapsed">Dashboard</span>
      </button>

      <div class="nav-items">
        <!-- Inventory with Dropdown -->
        <div class="item">
          <button class="sub-btn" @click="toggleSubmenu('inventory')" :class="{ 'active': activeSubmenu === 'inventory' }">
            <div class="btn-content">
              <i class="fas fa-warehouse"></i>
              <span v-show="!isCollapsed">Inventory</span>
            </div>
            <i v-show="!isCollapsed" class="fas fa-chevron-right" :class="{ 'rotate': activeSubmenu === 'inventory' }"></i>
          </button>
          <transition name="slide">
            <div class="sub-menu" v-show="activeSubmenu === 'inventory' && !isCollapsed">
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
          <span v-show="!isCollapsed">{{ item.label }}</span>
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
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isCollapsed = ref(false);
    const activeSubmenu = ref(null);

    const navItems = [
      { path: "/admin/view-user", label: "Manage User", icon: "fas fa-users" },
      { path: "/appointments", label: "Appointments", icon: "far fa-calendar-check" },
      { path: "/feedback", label: "Feedback & Evaluation", icon: "fas fa-scroll" },
      { path: "/admin/enrollment", label: "Enrollment", icon: "fas fa-scroll" },
    ];

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const toggleSubmenu = (menu) => {
      if (!isCollapsed.value) {
        activeSubmenu.value = activeSubmenu.value === menu ? null : menu;
      }
    };

    const goTo = (route) => {
      router.push(route);
    };

    const isActive = (path) => {
      return route.path === path;
    };

    return {
      isCollapsed,
      activeSubmenu,
      navItems,
      toggleSidebar,
      toggleSubmenu,
      goTo,
      isActive,
    };
  },
};
</script>

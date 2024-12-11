<template>
  <div class="top-nav">
    <div class="logo">
      <img src="/img/icons/logo.png" alt="Clinic Logo" class="logo-img" />
      <div class="logo-text">Clinic</div>
    </div>

    <div class="right-items">
      <button class="icon-btn" @click="toggleNotifications">
        <i class="far fa-bell"></i>
        <span class="notification-badge" v-if="notificationCount">{{ notificationCount }}</span>
      </button>
      
      <div class="user-menu" ref="userMenu">
        <button class="icon-btn" @click="toggleUserMenu">
          <i class="fas fa-user"></i>
        </button>
        <transition name="fade">
          <div v-if="isUserMenuOpen" class="user-dropdown">
            <div class="user-info">
              <div class="user-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="user-details">
                <p class="user-name">John Doe</p>
                <p class="user-role">Administrator</p>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item">
              <i class="fas fa-cog"></i>
              <span>Settings</span>
            </button>
            <button class="dropdown-item">
              <i class="fas fa-user-circle"></i>
              <span>Profile</span>
            </button>
            <div class="dropdown-divider"></div>
            <button class="logout-btn" @click="handleLogout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topNav",
  data() {
    return {
      isUserMenuOpen: false,
      notificationCount: 3,
    };
  },
  mounted() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/nav.css"; // Adjust the path if necessary
    document.head.appendChild(link);
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    toggleNotifications() {
      // Handle notifications logic
    },
    handleLogout() {
      // Handle logout logic
    },
  },
};
</script>

<style scoped>
/* Scoped styles for this component, if needed */
</style>

<template>
  <div class="top-nav flex justify-between items-center p-4 bg-white shadow-md">
    <div class="logo flex items-center space-x-3">
      <img src="/img/icons/logo.png" alt="Clinic Logo" class="logo-img w-10 h-10" />
      <div class="logo-text font-bold text-lg">Clinic</div>
    </div>

    <div class="right-items flex items-center space-x-4">
      <!-- Notification Button -->
      <button class="icon-btn relative" @click="toggleNotifications">
        <i class="far fa-bell text-xl"></i>
        <span class="notification-badge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5" v-if="notificationCount">{{ notificationCount }}</span>
      </button>

      <!-- Notification Modal -->
      <div v-if="showNotifications" class="modal-backdrop fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50" @click="toggleNotifications">
        <div class="notification-modal bg-white p-6 rounded-lg shadow-lg w-72 z-51" @click.stop>
          <h3 class="text-xl font-semibold mb-4">Notifications</h3>
          <ul class="list-none p-0 m-0 space-y-2">
            <li v-for="(notification, index) in notifications" :key="index" class="text-sm">{{ notification }}</li>
          </ul>
          <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" @click="toggleNotifications">Close</button>
        </div>
      </div>
    </div>

    <div class="user-menu relative">
      <button class="icon-btn" @click="toggleUserMenu">
        <i class="fas fa-user text-xl"></i>
      </button>
      <transition name="fade">
        <div v-if="isUserMenuOpen" class="user-dropdown absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <div class="user-info flex items-center space-x-3 p-4">
            <div class="user-avatar w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full">
              <i class="fas fa-user text-white"></i>
            </div>
            <div class="user-details">
              <p class="user-name font-semibold text-sm">Admin</p>
            </div>
          </div>
          <div class="dropdown-divider h-px bg-gray-300 my-2"></div>
          <button class="logout-btn w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100" @click="handleLogout">
            <i class="fas fa-sign-out-alt text-red-500"></i>
            <span>Logout</span>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "topNav",
  data() {
    return {
      isUserMenuOpen: false,
      showNotifications: false, // Track notification modal visibility
      notificationCount: 3, // Number of notifications
      notifications: ["New appointment scheduled", "Message from patient", "Reminder: Meeting at 3 PM"], // Notification messages
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
      this.showNotifications = !this.showNotifications; // Toggle modal visibility
    },
    async handleLogout() {
      try {
        const response = await fetch("http://localhost:5000/api/user/logout", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), // Pass the token in the Authorization header
          },
        });

        if (response.ok) {
          // Clear the token from local storage
          localStorage.removeItem("token");
          // Redirect to the login page
          this.$router.push("/"); 
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
};
</script>

<style scoped>
/* You can remove the previous custom CSS as Tailwind now handles it */
</style>

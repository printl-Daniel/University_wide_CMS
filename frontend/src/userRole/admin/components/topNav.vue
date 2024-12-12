<template>
  <div class="top-nav flex justify-between items-center p-4 bg-white shadow-md">
    <div class="logo flex items-center space-x-3">
      <img
        src="/img/icons/logo.png"
        alt="Clinic Logo"
        class="logo-img w-10 h-10"
      />
      <div class="logo-text font-bold text-lg">Clinic</div>
    </div>

    <div class="right-items flex items-center space-x-1">
      <!-- Notification Button -->
      <button class="icon-btn relative" @click="toggleNotifications">
        <i class="far fa-bell text-xl"></i>
        <span
          class="notification-badge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5"
          v-if="notificationCount"
          >{{ notificationCount }}</span
        >
      </button>
      <div class="user-menu relative">
        <button class="icon-btn" @click="toggleUserMenu">
          <i class="fas fa-user text-xl"></i>
        </button>
        <transition name="fade">
          <div
            v-if="isUserMenuOpen"
            class="user-dropdown absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
          >
            <div class="user-info flex items-center space-x-3 p-4">
              <div
                class="user-avatar w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full"
              >
                <i class="fas fa-user text-white"></i>
              </div>
              <div class="user-details">
                <p class="user-name font-semibold text-sm">Admin</p>
              </div>
            </div>
            <div class="dropdown-divider h-px bg-gray-300 my-2"></div>
            <button
              class="logout-btn w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100"
              @click="handleLogout"
            >
              <i class="fas fa-sign-out-alt text-red-500"></i>
              <span>Logout</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>

  <!-- Notification Modal -->
  <div
    v-if="showNotifications"
    class="modal-backdrop fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click="toggleNotifications"
  >
    <div
      class="notification-modal bg-white p-6 rounded-xl shadow-2xl w-96 max-h-[80vh] overflow-y-auto z-51"
      @click.stop
    >
      <h3 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Notifications
      </h3>
      <div class="space-y-4 max-h-96 overflow-y-auto">
        <div
          v-for="(notification, index) in notifications"
          :key="index"
          :class="[
            'bg-gray-50 border-l-4 rounded-lg shadow-sm p-4',
            notification.color === 'red' ? 'border-red-500' : '',
            notification.color === 'orange' ? 'border-orange-500' : '',
          ]"
        >
          <p class="text-gray-700 text-sm">{{ notification.message }}</p>
        </div>
      </div>
      <button
        class="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
        @click="toggleNotifications"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { itemsNeedAttention } from "../services/notificationServices";

const isUserMenuOpen = ref(false);
const showNotifications = ref(false);
const notificationCount = ref(0);
const notifications = ref([]);

const fetchItemsNeedAttention = async () => {
  try {
    const response = await itemsNeedAttention();
    const attentionItems = response;

    const newNotifications = attentionItems
      .map((item) => {
        let notification = null;
        let color = "";

        if (item.status === "Low Stock") {
          notification = `Low Stock Alert: ${item.itemName} is running low on stock.`;
          color = "red";
        } else if (item.status === "Expiring Soon") {
          notification = `Expiration Alert: ${
            item.itemName
          } is expiring on ${new Date(
            item.expirationDate
          ).toLocaleDateString()}.`;
          color = "orange";
        }

        if (notification) {
          return { message: notification, color };
        }
        return null;
      })
      .filter(Boolean);

    notifications.value.push(...newNotifications);
    notificationCount.value = notifications.value.length;
  } catch (error) {
    console.error("Error fetching items needing attention:", error);
  }
};

const fetchNotifications = async () => {
  await fetchItemsNeedAttention();
};

const router = useRouter();

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      localStorage.removeItem("token");
      router.push("/");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

onMounted(() => {
  fetchNotifications();
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/css/nav.css";
  document.head.appendChild(link);
});
</script>

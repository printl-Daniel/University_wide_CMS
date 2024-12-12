<template>
  <div class="min-h-screen bg-gray-50 shadow-md">
    <!-- Admin Navbar (Top Navbar) -->
    <div class="bg-white">
      <topNav />
    </div>
    <div class="flex">
      <div class="hidden md:block">
        <sideNav />
      </div>
      <!-- Main Content -->
      <div class="flex-1 p-6 md:p-8 space-y-8">
        <header class="flex justify-between items-center">
          <h6 class="text-2xl font-bold text-gray-600">Clinic Dashboard</h6>
          <router-link to="/admin/add-item">
            <button
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <Plus class="w-5 h-5 mr-2" />
              Add New Item
            </button>
          </router-link>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Total Items Card -->
          <div
            class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-700">Total Items</h2>
              <Package class="w-8 h-8 text-blue-500" />
            </div>
            <p class="text-3xl font-bold text-blue-600">{{ totalItems }}</p>
          </div>

          <!-- Low Stock Items Card -->
          <div
            class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-700">
                Low Stock Items
              </h2>
              <AlertTriangle class="w-8 h-8 text-yellow-500" />
            </div>
            <p class="text-3xl font-bold text-yellow-600">
              {{ totalLowStockItems }}
            </p>
          </div>

          <!-- Expiring Soon Card -->
          <div
            class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-700">Expiring Soon</h2>
              <Clock class="w-8 h-8 text-red-500" />
            </div>
            <p class="text-3xl font-bold text-red-600">{{ expiringItems }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Legends</h2>
          <!-- Legend -->
          <div
            class="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-600"
          >
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
              <p>
                <strong>Low Stock:</strong> Items with less than 10 units left
              </p>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
              <p>
                <strong>Expiring Soon:</strong> Items expiring within 7 days
              </p>
            </div>
          </div>
        </div>
        <!-- Inventory Table for Items that Need Attention -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 pb-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">
              Items that needs your attention
            </h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Expiry Date
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="item in mergedAttentionItems"
                  :key="'item-' + item.itemId"
                  class="hover:bg-gray-50"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
                  >
                    {{ item.itemName }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                    {{ item.quantity }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                    {{ formatDate(item.expirationDate) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      v-for="status in item.status"
                      :key="status"
                      :class="getStatusClass({ status })"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full mr-1"
                    >
                      {{ status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Plus, Package, AlertTriangle, Clock } from "lucide-vue-next";
import sideNav from "../components/sideNav.vue";
import topNav from "../components/topNav.vue";
import {
  totalItemsCount,
  totalLowItemsCount,
  totalExpiringSoon,
  itemsNeedAttention,
} from "../services/dashboardService";

const attentionItems = ref([]);
const totalLowStockItems = ref(0);
const totalItems = ref(0);
const expiringItems = ref(0);

const mergedAttentionItems = computed(() => {
  const mergedItems = {};
  attentionItems.value.forEach((item) => {
    if (!mergedItems[item.itemId]) {
      mergedItems[item.itemId] = { ...item, status: [item.status] };
    } else {
      mergedItems[item.itemId].status.push(item.status);
    }
  });
  return Object.values(mergedItems);
});

const fetchItemsNeedAttention = async () => {
  try {
    const response = await itemsNeedAttention();
    attentionItems.value = response;
  } catch (error) {
    console.error("Error fetching items needing attention:", error);
  }
};

const fetchTotalItems = async () => {
  try {
    const response = await totalItemsCount();
    totalItems.value = response;
  } catch (err) {
    console.error("Failed to fetch total items:", err);
  }
};

const fetchTotalLowItems = async () => {
  try {
    const response = await totalLowItemsCount();
    totalLowStockItems.value = response;
  } catch (err) {
    console.error("Failed to fetch total low items:", err);
  }
};

const fetchExpiringSoon = async () => {
  try {
    const response = await totalExpiringSoon();
    expiringItems.value = response;
  } catch (err) {
    console.error("Failed to fetch expiring soon items:", err);
  }
};

onMounted(() => {
  fetchTotalItems();
  fetchTotalLowItems();
  fetchExpiringSoon();
  fetchItemsNeedAttention();
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClass = (item) => {
  if (item.status === "Low Stock") return "bg-yellow-100 text-yellow-800";
  if (item.status === "Expiring Soon") return "bg-red-100 text-red-800";
  return "bg-green-100 text-green-800"; // Default for in-stock items
};
</script>

<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content flex">
      <!-- Sidebar Navigation -->
      <div class="sidebar">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="content flex-grow p-6">
        <div class="container mx-auto mt-4">
          <!-- Update Item Form -->
          <form @submit.prevent="submitForm" class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Item ID (Read-only) -->
              <div class="mb-6">
                <label for="itemId" class="block text-gray-700 font-semibold mb-2">Item ID</label>
                <input
                  type="text"
                  id="itemId"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="item.itemId"
                  readonly
                />
              </div>

              <!-- Item Name -->
              <div class="mb-6">
                <label for="itemName" class="block text-gray-700 font-semibold mb-2">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="item.itemName"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Category -->
              <div class="mb-6">
                <label for="category" class="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                  id="category"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="item.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Medical Supply">Medical Supply</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Purchase Date -->
              <div class="mb-6">
                <label for="purchaseDate" class="block text-gray-700 font-semibold mb-2">Purchase Date</label>
                <input
                  type="date"
                  id="purchaseDate"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="item.purchaseDate"
                  required
                />
              </div>

              <!-- Expiration Date -->
              <div class="mb-6">
                <label for="expirationDate" class="block text-gray-700 font-semibold mb-2">Expiration Date</label>
                <input
                  type="date"
                  id="expirationDate"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="item.expirationDate"
                  required
                />
              </div>
            </div>

            <div class="mb-6">
              <!-- Supplier -->
              <label for="supplier" class="block text-gray-700 font-semibold mb-2">Supplier</label>
              <input
                type="text"
                id="supplier"
                class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="item.supplier"
                required
              />
            </div>

            <!-- Submit Button -->
            <div class="text-right mt-6">
              <button
                type="submit"
                class="w-full py-4 px-6 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';

export default {
  name: "UpdateItem",
  components: {
    sideNav,
    topNav
  },
  data() {    
    return {
      item: {
        itemId: "",
        itemName: "",
        category: "",
        expirationDate: "", // Expiration date
        supplier: "", // Supplier name
        purchaseDate: "", // Purchase date
      },
    };
  },
  created() {
    this.fetchItemData();
  },
  methods: {
    // Fetch item data on component creation
        async fetchItemData() {
      const itemId = this.$route.params.id;
      if (!itemId) {
        alert("Item ID is missing.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/inventory/${itemId}`);
        this.item = response.data; // Pre-fill the form with existing item data
      } catch (error) {
        console.error("Error fetching item data:", error);
        alert("Failed to fetch item data. Please try again.");
      }
    },
    // Handle form submission
    async submitForm() {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/inventory/update/${this.item.itemId}`,
          this.item
        );

        console.log("Item updated successfully:", response.data);
        alert("Item updated successfully.");
      } catch (error) {
        console.error("Error updating item:", error.response?.data?.message || error.message);
        alert("Failed to update item. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Custom styles for the update form */
</style>

<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content flex">
      <!-- Sidebar Navigation -->
      <div class="sidebar w-64 bg-gray-800 text-white">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="content flex-grow p-6">
        <div class="container mx-auto mt-4">

          <form @submit.prevent="submitForm" class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Item ID -->
              <div class="mb-6">
                <label for="itemId" class="block text-gray-700 font-semibold mb-2">Item ID</label>
                <input
                  type="text"
                  id="itemId"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="newItem.itemId"
                  required
                />
              </div>

              <!-- Item Name -->
              <div class="mb-6">
                <label for="itemName" class="block text-gray-700 font-semibold mb-2">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="newItem.itemName"
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
                  v-model="newItem.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Medical Supply">Medical Supply</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              <!-- Unit of Measure -->
              <div class="mb-6">
                <label for="unitOfMeasure" class="block text-gray-700 font-semibold mb-2">Unit of Measure</label>
                <select
                  id="unitOfMeasure"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="newItem.unitOfMeasure"
                  required
                >
                  <option value="Box">Box</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Pack">Pack</option>
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
                  v-model="newItem.purchaseDate"
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
                  v-model="newItem.expirationDate"
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
                v-model="newItem.supplier"
                required
              />
            </div>

            <!-- Submit Button -->
            <div class="text-right mt-6">
              <button
                type="submit"
                class="w-full py-4 px-6 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all"
              >
                Add Product
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
  name: "AddItem",
  components: {
    sideNav,
    topNav
  },
  data() {
    return {
      newItem: {
        itemId: "",
        itemName: "",
        category: "",
        unitOfMeasure: "Box", // Default value for unit of measure
        expirationDate: "", // Expiration date
        supplier: "", // Supplier name
        purchaseDate: "", // Purchase date
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inventory/add",
          this.newItem
        );

        console.log("Item added successfully:", response.data);
        alert("Item added successfully.");
        // Reset form fields
        this.newItem = {
          itemId: "",
          itemName: "",
          category: "",
          unitOfMeasure: "Box",
          expirationDate: "",
          supplier: "",
          purchaseDate: "",
        };
      } catch (error) {
        console.error(
          "Error adding item:",
          error.response?.data?.message || error.message
        );
        alert("Failed to add item. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Optional: If you need to include additional custom styles, you can do so here */
</style>

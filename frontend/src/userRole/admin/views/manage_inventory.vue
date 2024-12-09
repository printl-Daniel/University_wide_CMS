<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content flex">
      <!-- Sidebar Navigation -->
      <div class="sidebar w-1/5 bg-gray-800 text-white">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="content flex-grow p-4">

        <!-- Enhanced container for the table -->
        <div class="table-container bg-white border border-gray-300 rounded-lg shadow-md p-4">
          <div class="table-responsive">
            <table id="inventoryTable" class="table-auto w-full">
              <thead>
                <tr>
                  <th class="px-4 py-2 border-b text-left">Item ID</th>
                  <th class="px-4 py-2 border-b text-left">Item Name</th>
                  <th class="px-4 py-2 border-b text-left">Category</th>
                  <th class="px-4 py-2 border-b text-left">Quantity</th>
                  <th class="px-4 py-2 border-b text-left">Unit of Measure</th>
                  <th class="px-4 py-2 border-b text-left">Expiration Date</th>
                  <th class="px-4 py-2 border-b text-left">Supplier</th>
                  <th class="px-4 py-2 border-b text-left">Purchase Date</th>
                  <th class="px-4 py-2 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in inventoryItems" :key="item._id">
                  <td class="px-4 py-2 border-b">{{ item.itemId }}</td>
                  <td class="px-4 py-2 border-b">{{ item.itemName }}</td>
                  <td class="px-4 py-2 border-b">{{ item.category }}</td>
                  <td class="px-4 py-2 border-b">{{ item.quantity }}</td>
                  <td class="px-4 py-2 border-b">{{ item.unitOfMeasure }}</td>
                  <td class="px-4 py-2 border-b">{{ formatDate(item.expirationDate) }}</td>
                  <td class="px-4 py-2 border-b">{{ item.supplier }}</td>
                  <td class="px-4 py-2 border-b">{{ formatDate(item.purchaseDate) }}</td>
                  <td class="px-4 py-2 border-b text-center">
                    <button @click="openAddQuantityModal(item)" class="btn btn-primary p-2 bg-blue-500 text-white rounded-lg">Add Quantity</button> 
                    <button @click="openDisburseModal(item)" class="btn btn-secondary p-2 bg-gray-500 text-white rounded-lg">Disburse</button>
                  </td>
                </tr>            
              </tbody>
            </table>
          </div>
        </div>

        <!-- Add Quantity Modal -->
        <addQuantityModal
          v-if="showAddQuantityModal"
          :selectedItem="selectedItemForQuantity"
          :showModal="showAddQuantityModal"
          @close="showAddQuantityModal = false"
          @quantity-added="handleQuantityAdded"
        />

        <!-- Disburse Modal -->
        <disburseModal
          v-if="showDisburseModal"
          :selectedItem="selectedItemForDisburse"
          :showModal="showDisburseModal"
          @close="showDisburseModal = false"
          @item-disbursed="handleItemDisbursed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';
import addQuantityModal from '../../../components/addQuantityModal.vue';
import disburseModal from '../../../components/disburseModal.vue';

export default {
  components: {
    sideNav,
    topNav,
    addQuantityModal,
    disburseModal,
  },
  data() {
    return {
      inventoryItems: [],
      showAddQuantityModal: false,
      selectedItemForQuantity: null,
      showDisburseModal: false,
      selectedItemForDisburse: null,
    };
  },
  methods: {
    async displayItems() {
      try {
        const res = await axios.get('http://localhost:5000/api/inventory/display');
        this.inventoryItems = res.data.data; // Update the inventory data
        this.$nextTick(() => {
          this.initializeDataTable(); // Reinitialize DataTable after data is loaded
        });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    initializeDataTable() {
      // Initialize DataTable only if it hasn't been initialized yet
      if ($.fn.dataTable.isDataTable('#inventoryTable')) {
        $('#inventoryTable').DataTable().destroy();
      }
      $('#inventoryTable').DataTable({
        searching: true, // Enable search functionality
        paging: true,    // Enable pagination
        ordering: true,  // Enable column sorting
        info: true,      // Show info like "Showing 1 to 10 of 100 entries"
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US'); // formats date to MM/DD/YYYY
    },
    openAddQuantityModal(item) {
      this.selectedItemForQuantity = item;
      this.showAddQuantityModal = true;
    },
    handleQuantityAdded(updatedItem) {
      // Find the updated item in the inventory list and update it
      const index = this.inventoryItems.findIndex((item) => item._id === updatedItem._id);
      if (index !== -1) {
        this.inventoryItems[index] = updatedItem;
      }
      this.refreshDataTable(); // Refresh DataTable after quantity is added
    },
    refreshDataTable() {
      // Reinitialize the DataTable to reflect any changes in the inventory
      this.$nextTick(() => {
        this.initializeDataTable();
      });
    },
    openDisburseModal(item) {
      this.selectedItemForDisburse = item;
      this.showDisburseModal = true;
    },
    handleItemDisbursed(updatedItem) {
      const index = this.inventoryItems.findIndex((item) => item._id === updatedItem._id);
      if (index !== -1) {
        this.inventoryItems[index] = updatedItem;
      }
      this.refreshDataTable(); // Refresh DataTable
    },
  },
  mounted() {
    this.displayItems();
  }
};
</script>

<style scoped>
/* Tailwind CSS already handles most styling */
.table-container {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-right: 20px;
}

.table {
  margin-top: 20px;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table thead {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table thead th {
  text-align: center;
}

.table tbody td {
  text-align: center;
}
</style>

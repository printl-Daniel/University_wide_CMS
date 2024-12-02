<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content d-flex">
      <!-- Sidebar Navigation -->
      <div class="sidebar">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="content flex-grow-1">

        <!-- Enhanced container for the table -->
        <div class="table-container">
          <div class="mt-2 table-responsive">
            <table id="inventoryTable" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Item ID</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit of Measure</th>
                  <th scope="col">Expiration Date</th>
                  <th scope="col">Supplier</th>
                  <th scope="col">Purchase Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in inventoryItems" :key="item._id">
                  <td>{{ item.itemId }}</td>
                  <td>{{ item.itemName }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.unitOfMeasure }}</td>
                  <td>{{ formatDate(item.expirationDate) }}</td>
                  <td>{{ item.supplier }}</td>
                  <td>{{ formatDate(item.purchaseDate) }}</td>
                  <td>
                    <button @click="openAddQuantityModal(item)" class="btn btn-primary">Add Quantity</button> 
                  </td>
                </tr>            
              </tbody>
            </table>
          </div>
        </div>

        <addQuantityModal
          v-if="showAddQuantityModal"
          :selectedItem="selectedItemForQuantity"
          :showModal="showAddQuantityModal"
          @close="showAddQuantityModal = false"
          @quantity-added="handleQuantityAdded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';
import addModal from './addItemModal.vue';
import editItemModal from '../../../components/updateItemModal.vue';
import addQuantityModal from '../../../components/addQuantityModal.vue';

export default {
  components: {
    sideNav,
    topNav,
    addModal,
    editItemModal,
    addQuantityModal,
  },
  data() {
    return {
      showModal: false,
      inventoryItems: [],
      showEditModal: false,
      selectedItem: null,
      searchQuery: '',
      showAddQuantityModal: false,
      selectedItemForQuantity: null,
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
    filterInventory() {
      // Implement search filtering logic here
      // For now, we can use the built-in DataTables search functionality
      $('#inventoryTable').DataTable().search(this.searchQuery).draw();
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
  },
  mounted() {
    this.displayItems();
  }
};
</script>

<style scoped>
/* Add a container around the table with border and shadow */
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

/* Table header styling */
.table thead {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}

/* Hover effect for rows */
.table tbody tr:hover {
  background-color: #f1f1f1;
}


/* Responsive Table */
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

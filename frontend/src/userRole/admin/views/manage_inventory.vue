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
        <h2 class="page-title">Inventory</h2>

        <div class="d-flex mb-4 search-container">
          <div class="search-bar-container">
            <input
              type="text"
              v-model="searchQuery"
              class="form-control search-input"
              placeholder="Search items..."
              @input="filterInventory"
            />
            <button class="btn btn-secondary search-btn" @click="filterInventory">
              <i class="fas fa-search"></i> Search
            </button>
          </div>
          <button class="btn btn-primary add-item-btn" @click="showModal = true">
            <i class="fas fa-plus"></i> Add Item
          </button>
          <!-- Button to show Transaction History -->
          <button class="btn btn-info ml-3" @click="showHistoryModal = true">
            <i class="fas fa-history"></i> View Transaction History
          </button>
          <!-- Button to show Audit Records -->
          <button class="btn btn-warning ml-3" @click="showAuditModal = true">
            <i class="fas fa-search"></i> View Audit Logs
          </button>
        </div>

        <div class="mt-4 table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Item ID (Barcode)</th>
                <th scope="col">Item Name</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit</th>
                <th scope="col">Expiration Date</th>
                <th scope="col">Supplier</th>
                <th scope="col">Purchase Date</th>
                <th scope="col">Cost per Unit</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in inventory" :key="item._id">
                <td>{{ item.itemId }}</td>
                <td>{{ item.itemName }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unitOfMeasure }}</td>
                <td>{{ formatDate(item.expirationDate) }}</td>
                <td>{{ item.supplier }}</td>
                <td>{{ formatDate(item.purchaseDate) }}</td>
                <td>{{ item.costPerUnit.toFixed(2) }}</td>
                <td>
                  <button class="btn btn-warning" @click="openEditModal(item)">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <!-- Button to view audit for each item -->
                  <button class="btn btn-info ml-2" @click="openAuditModal(item)">
                    <i class="fas fa-search"></i> Audit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add Inventory Modal -->
        <addModal v-if="showModal" @close="showModal = false" @add-item="addItem" />
        <!-- Edit Inventory Modal -->
        <editItemModal v-if="showEditModal" :selectedItem="selectedItem" @close="showEditModal = false" @edit-item="editItem" />
        
        <!-- History Modal -->
        <historyModal v-if="showHistoryModal" @close="showHistoryModal = false" />
        
        <!-- Audit Modal -->
        <auditModal v-if="showAuditModal" @close="showAuditModal = false" :selectedItem="selectedItem" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';
import addModal from '../../../components/addItemModal.vue';
import editItemModal from '../../../components/updateItemModal.vue';
import historyModal from '../../../components/historyModal.vue';
import auditModal from '../../../components/auditModal.vue'; // Import the Audit Modal

export default {
  components: {
    sideNav,
    topNav,
    addModal,
    editItemModal,
    historyModal,
    auditModal, // Register the Audit Modal component
  },
  data() {
    return {
      showModal: false,
      inventory: [],
      showEditModal: false,
      selectedItem: null,
      searchQuery: '',
      showHistoryModal: false,
      showAuditModal: false, // Flag to show Audit modal
    };
  },
  methods: {
    addItem(newItem) {
      this.inventory.push(newItem);
      this.showModal = false;
    },
    openEditModal(item) {
      this.selectedItem = item;
      this.showEditModal = true;
    },
    async displayItems() {
      try {
        const res = await axios.get('http://localhost:5000/api/inventory/display-items');
        this.inventory = res.data.items;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    filterInventory() {
      // Implement search filtering logic here
    },
    openAuditModal(item) {
      this.selectedItem = item;
      this.showAuditModal = true;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US'); // formats date to MM/DD/YYYY
    },
  },
  mounted() {
    this.displayItems();
  }
};
</script>

<style scoped>
.page-title {
  font-size: 22px; /* Reduced font size */
  font-weight: bold;
  margin-bottom: 16px; /* Reduced bottom margin */
  color: #333;
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar-container {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.search-input {
  width: 100%;
  border-radius: 25px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  font-size: 14px; /* Adjusted font size */
}

.search-btn {
  border-radius: 25px;
  background-color: #007bff;
  color: white;
  padding: 8px 15px;
  margin-left: 10px;
  font-size: 14px; /* Adjusted font size */
}

.add-item-btn {
  background-color: #28a745;
  color: white;
  border-radius: 25px;
  padding: 8px 20px;
  font-size: 14px; /* Adjusted font size */
}

.table-responsive {
  margin-top: 20px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table th,
.table td {
  padding: 10px 12px; /* Reduced padding */
  border-bottom: 1px solid #eaeaea;
  text-align: left;
  font-size: 14px; /* Adjusted font size */
}

.table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px; /* Adjusted font size */
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table td button {
  font-size: 14px; /* Adjusted button font size */
}

.table .btn {
  border-radius: 25px;
  transition: background-color 0.3s;
}

.table .btn:hover {
  background-color: #0056b3;
}

/* Add Modal Button */
.add-item-btn i, .search-btn i {
  margin-right: 5px;
}
</style>

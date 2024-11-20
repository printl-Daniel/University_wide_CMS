<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content d-flex">
      <!-- Sidebar -->
      <div class="sidebar">
        <sideNav />
      </div>

      <!-- Main Content Area (flex-grow) -->
      <div class="content flex-grow-1">
        <div class="container">
          <h2>Inventory</h2>
          <div class="d-flex mb-4">
            <input
              type="text"
              v-model="searchQuery"
              class="form-control mr-2" 
              placeholder="Search items..."
              @input="filterInventory"
            />
            <button 
              class="btn btn-secondary"
              @click="filterInventory">
              Search
            </button>
          </div>
          <button class="btn btn-primary ml-4" @click="showModal = true">Add Item</button>

          <!-- List of inventory items -->
          <div class="mt-4">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Threshold</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in inventory" :key="item._id">
                  <td>{{ item.itemId }}</td>
                  <td>{{ item.itemName }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.unit }}</td>
                  <td>{{ item.threshold }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <button class="btn btn-warning" @click="openEditModal(item)">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Add Inventory Modal -->
          <addModal v-if="showModal" @close="showModal = false" @add-item="addItem"/>
          <editItemModal v-if="showEditModal" :selectedItem="selectedItem" @close="showEditModal = false" @edit-item="editItem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import topNav from '../components/topNav.vue'
import sideNav from '../components/sideNav.vue'
import addModal from '../../../components/addItemModal.vue'
import editItemModal from '../../../components/updateItemModal.vue'

export default {
  components: {
    topNav,
    sideNav,
    addModal,
    editItemModal,
  },
  data() {
    return {
      showModal: false,
      inventory: [], // Inventory list
      showEditModal: false, 
      selectedItem: null,
      searchQuery: '', // Search query for filtering items
    };
  },
  methods: {
    addItem(newItem) {
      // Add the new item to the inventory array
      this.inventory.push(newItem);
      this.showModal = false; // Close the modal
    },
    openEditModal(item) {
      this.selectedItem = item; // Set the selected item for editing
      this.showEditModal = true; // Show the edit modal
    },
    filterInventory() {
      // Filter inventory based on search query
      if (this.searchQuery) {
        this.inventory = this.inventory.filter(item =>
          item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.displayItems(); // Reset to original items if search query is empty
      }
    },
    async displayItems() {
      try {
        const res = await axios.get('http://localhost:5000/api/inventory/display-items');
        this.inventory = res.data.items;
      } catch (error) {
        console.error('Error fetching items:', error);
        alert('Failed to fetch items');
      }
    }
  },
  mounted(){
    this.displayItems();
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
}

table.table th,
table.table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eaeaea;
}

table.table th {
  background-color: #007bff; /* Primary color for header */
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

table.table tbody tr:hover {
  background-color: #f1f1f1; /* Light gray on hover */
}

table.table tbody tr:last-child td {
  border-bottom: none; /* Remove border from the last row */
}
</style>

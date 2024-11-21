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
          </div>

          <div class="mt-4 table-responsive">
            <table class="table table-striped table-hover">
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
                    <button class="btn btn-warning" @click="openEditModal(item)">
                      <i class="fas fa-edit"></i> Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Add Inventory Modal -->
          <addModal v-if="showModal" @close="showModal = false" @add-item="addItem" />
          <editItemModal v-if="showEditModal" :selectedItem="selectedItem" @close="showEditModal = false" @edit-item="editItem" />
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

export default {
  components: {
    sideNav,
    topNav,
    addModal,
    editItemModal,
  },
  data() {
    return {
      showModal: false,
      inventory: [],
      showEditModal: false,
      selectedItem: null,
      searchQuery: '',
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
        //alert('Failed to fetch items');
      }
    },
    filterInventory() {
      // Implement search filtering logic here
    }
  },
  mounted() {
    this.displayItems();
  }
};
</script>

<style scoped>
.page-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
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
}

.search-btn {
  border-radius: 25px;
  background-color: #007bff;
  color: white;
  padding: 8px 15px;
  margin-left: 10px;
  font-size: 14px;
}

.add-item-btn {
  background-color: #28a745;
  color: white;
  border-radius: 25px;
  padding: 8px 20px;
  font-size: 14px;
}

.table-responsive {
  margin-top: 20px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table th,
.table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eaeaea;
  text-align: left;
}

.table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table td button {
  font-size: 14px;
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

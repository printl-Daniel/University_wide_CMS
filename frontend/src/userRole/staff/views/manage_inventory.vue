<template>
  <div class="d-flex">
    <!-- Sidebar Component -->
    <staffSidebar />

    <!-- Main Content Container -->
    <div class="container mt-4 flex-grow-1">
      <h2>Inventory</h2>
      <button class="btn btn-primary" @click="showModal = true">Add Item</button>

      <!-- List of inventory items -->
      <div class="mt-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in inventory" :key="item._id">
              <td>{{ item.itemId }}</td>
              <td>{{ item.itemName }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.status }}</td>
              <td> </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- AddInventoryModal Component -->
      <addModal v-if="showModal" @close="showModal = false" @add-item="addItem"/>
    </div>
  </div>
</template>

<script>
import staffSidebar from '../components/staff_sideBar.vue'
import addModal from '../../../components/addItemModal.vue'

export default {
  components: {
    staffSidebar, 
    addModal
  },
  data() {
    return {
      showModal: false,
      inventory: [] // Inventory list
    };
  },
  methods: {
    addItem(newItem) {
      // Add the new item to the inventory array
      this.inventory.push(newItem);
      this.showModal = false; // Close the modal
    }
  }
};
</script>

<style scoped>
.d-flex {
  display: flex;
}

.container {
  flex-grow: 1;
  margin-left: 20px; /* Optional: for some spacing between sidebar and content */
  padding: 20px;
  flex: 1;
}
</style>

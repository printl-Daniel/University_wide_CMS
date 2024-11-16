<template>
  <div>
    <navBar />
    <!-- Main Layout with Sidebar and Content -->
    <div class="d-flex mt-5 pt-3">

      <!-- Main Content Container (flex-grow) -->
      <div class="container-fluid mt-4 flex-grow-1">
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
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add Inventory Modal -->
        <addModal v-if="showModal" @close="showModal = false" @add-item="addItem"/>
      </div>
    </div>
  </div>
</template>


<script>
import navBar from '../components/staff_navbar.vue'
import addModal from '../../../components/addItemModal.vue'

export default {
  components: {
    navBar, 
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

.container-fluid {
  padding: 20px;
}

/* Style the content area to ensure it doesn't go under the fixed navbar */
.container-fluid {
  margin-left: 250px; /* Ensure it starts after the sidebar */
  padding-top: 20px;
  flex-grow: 1;
}

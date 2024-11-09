<template>
  <div class="inventory-manager">
    <div>
      <staffSidebar/>
    </div>

    <div class="content">
      <h2>Inventory</h2>
    <!-- Search and Filter -->
    <div class="inventory-controls">
      <input v-model="search" type="text" placeholder="Search..." />
      <select v-model="filter">
        <option value="">All</option>
        <option value="Tablet">Tablet</option>
        <option value="Syrup">Syrup</option>
        <option value="Ointment">Ointment</option>
        <option value="Spray">Spray</option>
      </select>
      <button @click="showAddItemModal">+ Add New Item</button>
    </div>

    <!-- Inventory Table -->
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>SKU</th>
          <th>Type</th>
          <th>Total Stock</th>
          <th>Available Stock</th>
          <th>Expired Stock</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredInventory" :key="item.id">
          <td>{{ item.itemName }}</td>
          <td>{{ item.sku }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.totalStock }}</td>
          <td>{{ item.availableStock }}</td>
          <td :class="{ expired: item.expiredStock > 0 }">{{ item.expiredStock > 0 ? `${item.expiredStock} Expired` : "-" }}</td>
          <td>{{ formatPrice(item.price) }}</td>
          <td>
            <button @click="editItem(item)">Edit</button>
            <button @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <!-- Modal for adding new item -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Add New Item</h3>
        <form @submit.prevent="addItem">
          <label for="itemName">Item Name</label>
          <input type="text" v-model="newItem.itemName" id="itemName" required />

          <label for="sku">SKU</label>
          <input type="text" v-model="newItem.sku" id="sku" required />

          <label for="type">Type</label>
          <select v-model="newItem.type" id="type" required>
            <option value="Tablet">Tablet</option>
            <option value="Syrup">Syrup</option>
            <option value="Ointment">Ointment</option>
            <option value="Spray">Spray</option>
          </select>

          <label for="totalStock">Total Stock</label>
          <input type="number" v-model="newItem.totalStock" id="totalStock" required />

          <label for="availableStock">Available Stock</label>
          <input type="number" v-model="newItem.availableStock" id="availableStock" required />

          <label for="expiredStock">Expired Stock</label>
          <input type="number" v-model="newItem.expiredStock" id="expiredStock" required />

          <label for="price">Price</label>
          <input type="number" v-model="newItem.price" id="price" step="0.01" required />

          <button type="submit">Add Item</button>
          <button @click="closeModal" type="button">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
 import staffSidebar from '../components/staff_sideBar.vue'
export default {
  components: {
      staffSidebar
  },
  data() {
    return {
      inventory: [],
      search: "",
      filter: "",
      showModal: false,
      newItem: {
        itemName: "",
        sku: "",
        type: "",
        totalStock: 0,
        availableStock: 0,
        expiredStock: 0,
        price: 0.0,
      },
    };
  },
  computed: {
    filteredInventory() {
      return this.inventory.filter(item => {
        const matchesSearch = item.itemName.toLowerCase().includes(this.search.toLowerCase());
        const matchesFilter = this.filter ? item.type === this.filter : true;
        return matchesSearch && matchesFilter;
      });
    },
  },
  methods: {
    async fetchInventory() {
      const response = await fetch("/api/inventory");
      this.inventory = await response.json();
    },
    showAddItemModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetNewItem();
    },
    resetNewItem() {
      this.newItem = {
        itemName: "",
        sku: "",
        type: "",
        totalStock: 0,
        availableStock: 0,
        expiredStock: 0,
        price: 0.0,
      };
    },
    async addItem() {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newItem),
      });

      if (response.ok) {
        const newItem = await response.json();
        this.inventory.push(newItem);
        this.closeModal();
      } else {
        alert("Failed to add item");
      }
    },
    editItem(item) {
      // Logic to edit item, such as opening a modal with item data
    },
    async deleteItem(id) {
      if (confirm("Are you sure you want to delete this item?")) {
        await fetch(`/api/inventory/${id}`, { method: "DELETE" });
        this.inventory = this.inventory.filter(item => item.id !== id);
      }
    },
    formatPrice(price) {
      return `SGD ${price.toFixed(2)}`;
    },
  },
  mounted() {
    this.fetchInventory();
  },
};
</script>
 
<style>
.inventory-manager {
display: flex;
gap: 1vw;
}

.content{
  padding: 1vw;
}

.inventory-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

td.expired {
  color: red;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.modal input,
.modal select {
  width: 100%;
  margin-bottom: 10px;
}

.modal button {
  margin-top: 10px;
  cursor: pointer;
}
</style>

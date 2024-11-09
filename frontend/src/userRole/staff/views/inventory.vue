<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Inventory Table -->
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="card-title">Clinic Inventory</h5>
            <button class="btn btn-primary" @click="addItem">Add Item</button>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in paginatedInventory" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <button class="btn btn-warning btn-sm" @click="editItem(item)">
                      Edit
                    </button>
                    <button class="btn btn-danger btn-sm" @click="deleteItem(item.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: page === 1 }">
                  <button class="page-link" @click="page--">Previous</button>
                </li>
                <li class="page-item" v-for="n in pageCount" :key="n" :class="{ active: n === page }">
                  <button class="page-link" @click="page = n">{{ n }}</button>
                </li>
                <li class="page-item" :class="{ disabled: page === pageCount }">
                  <button class="page-link" @click="page++">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Item Modal -->
    <div class="modal fade" id="itemModal" tabindex="-1" aria-labelledby="itemModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="itemModalLabel">{{ isEditing ? 'Edit Item' : 'Add New Item' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveItem">
              <div class="mb-3">
                <label for="itemName" class="form-label">Item Name</label>
                <input type="text" class="form-control" id="itemName" v-model="item.name" required />
                <div class="invalid-feedback" v-if="!nameRules[0](item.name)">
                  {{ nameRules[0](item.name) }}
                </div>
              </div>
              <div class="mb-3">
                <label for="itemQuantity" class="form-label">Quantity</label>
                <input type="number" class="form-control" id="itemQuantity" v-model="item.quantity" required />
                <div class="invalid-feedback" v-if="!quantityRules[0](item.quantity)">
                  {{ quantityRules[0](item.quantity) }}
                </div>
              </div>
              <div class="mb-3">
                <label for="itemPrice" class="form-label">Price</label>
                <input type="number" class="form-control" id="itemPrice" v-model="item.price" required />
                <div class="invalid-feedback" v-if="!priceRules[0](item.price)">
                  {{ priceRules[0](item.price) }}
                </div>
              </div>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="!valid">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      isEditing: false,
      page: 1,
      itemsPerPage: 5,
      inventory : [],
      item: {
        id: null,
        name: '',
        quantity: 0,
        price: 0,
      },
      headers: [
        { text: 'Name', align: 'start', key: 'name', sortable: true },
        { text: 'Quantity', key: 'quantity', sortable: true },
        { text: 'Price', key: 'price', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      quantityRules: [
        v => !!v || 'Quantity is required',
        v => v > 0 || 'Quantity must be greater than 0',
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v => v > 0 || 'Price must be greater than 0',
      ],
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.inventory.length / this.itemsPerPage);
    },
    paginatedInventory() {
      const start = (this.page - 1) * this.itemsPerPage;
      return this.inventory.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    addItem() {
      this.isEditing = false;
      this.item = { id: null, name: '', quantity: 0, price: 0 };
      this.dialog = true;
      const modal = new bootstrap.Modal(document.getElementById('itemModal'));
      modal.show();
    },
    editItem(item) {
      this.isEditing = true;
      this.item = { ...item };
      this.dialog = true;
      const modal = new bootstrap.Modal(document.getElementById('itemModal'));
      modal.show();
    },
    saveItem() {
      if (this.isEditing) {
        const index = this.inventory.findIndex((i) => i.id === this.item.id);
        if (index !== -1) {
          this.inventory.splice(index, 1, this.item); // Update item in array
        }
      } else {
        this.item.id = Date.now(); // Generate a simple unique ID
        this.inventory.push(this.item); // Add new item to inventory
      }
      this.dialog = false;
      const modal = bootstrap.Modal.getInstance(document.getElementById('itemModal'));
      modal.hide();
    },
    deleteItem(id) {
      const index = this.inventory.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.inventory.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
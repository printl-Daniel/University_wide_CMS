<template>
  <staffSidebar />
  <div class="container mt-5">
    <h1>Inventory Management</h1>

    <!-- Add Product Form -->
    <div class="card mt-4">
      <div class="card-header">
        <h5>Add New Product</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="addProduct">
          <div class="mb-3">
            <label for="productId" class="form-label">Product ID</label>
            <input type="text" class="form-control" id="productId" v-model="newProduct.productId" required />
          </div>
          <div class="mb-3">
            <label for="productName" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="productName" v-model="newProduct.productName" required />
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <select class="form-select" v-model="newProduct.category" required>
              <option value="medicine">Medicine</option>
              <option value="medical supply">Medical Supply</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" v-model="newProduct.description"></textarea>
          </div>
          <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="quantity" v-model="newProduct.quantity" required />
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select class="form-select" v-model="newProduct.status" required>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>

    <!-- Product List -->
    <div class="mt-5">
      <h3>Inventory Products</h3>
      <div v-if="products.length > 0">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product._id">
                <td>{{ product.productId }}</td>
                <td>{{ product.productName }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.status }}</td>
                <td>
                  <button @click="openQuantityUpdateModal(product)" class="btn btn-warning btn-sm">Add Quantity</button>
                  <button @click="openEditProductModal(product)" class="btn btn-info btn-sm">Edit Product</button>
                  <button @click="openHistoryModal(product)" class="btn btn-secondary btn-sm">View History</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <p>No products found in the inventory.</p>
      </div>
    </div>
    
<!-- Modal for Viewing Product History -->
<div class="modal fade" id="historyModal" tabindex="-1" aria-labelledby="historyModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="historyModalLabel">Product History</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-if="history.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Previous Quantity</th>
                <th>New Quantity</th>
                <th>Quantity Change</th>
                <th>Date</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="historyItem in history" :key="historyItem._id">
                <td>{{ historyItem.action }}</td>
                <td>{{ historyItem.previousQuantity }}</td>
                <td>{{ historyItem.newQuantity }}</td>
                <td>{{ historyItem.quantityChange }}</td>
                <td>{{ new Date(historyItem.date).toLocaleString() }}</td>
                <td>{{ historyItem.user ? historyItem.user.name : 'Unknown' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>No history available for this product.</p>
        </div>
      </div>
    </div>
  </div>
</div>



    <!-- Modal for Quantity Update -->
    <div class="modal fade" id="quantityModal" tabindex="-1" aria-labelledby="quantityModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="quantityModalLabel">Update Product Quantity</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedProduct">
              <p><strong>{{ selectedProduct.productName }}</strong></p>
              <div class="mb-3">
                <label for="quantityChange" class="form-label">Quantity Change</label>
                <input type="number" class="form-control" id="quantityChange" v-model="quantityChange" required />
              </div>
              <button @click="updateQuantity" class="btn btn-success">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Editing Product Details -->
    <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductModalLabel">Edit Product Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="editableProduct">
              <div class="mb-3">
                <label for="editProductName" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="editProductName" v-model="editableProduct.productName" required />
              </div>
              <div class="mb-3">
                <label for="editCategory" class="form-label">Category</label>
                <select class="form-select" v-model="editableProduct.category" required>
                  <option value="medicine">Medicine</option>
                  <option value="medical supply">Medical Supply</option>
                  <option value="equipment">Equipment</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="editDescription" class="form-label">Description</label>
                <textarea class="form-control" id="editDescription" v-model="editableProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="editStatus" class="form-label">Status</label>
                <select class="form-select" v-model="editableProduct.status" required>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
              <button @click="updateProductDetails" class="btn btn-success">Save Changes</button>
            </div>
          </div>
        </div>
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
      newProduct: {
        productId: '',
        productName: '',
        description: '',
        category: 'medicine',
        quantity: 0,
        status: 'in-stock',
      },
      products: [],
      selectedProduct: null,
      quantityChange: 0,
      editableProduct: null,
      history: [],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/inventory');
        const data = await response.json();
        if (data.products) {
          this.products = data.products;
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async addProduct() {
      try {
        const response = await fetch('http://localhost:5000/api/inventory/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newProduct),
        });

        const data = await response.json();
        if (data.product) {
          this.products.push(data.product);
          this.newProduct = {
            productId: '',
            productName: '',
            description: '',
            category: 'medicine',
            quantity: 0,
            status: 'in-stock',
          };
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    openQuantityUpdateModal(product) {
      this.selectedProduct = product;
      this.quantityChange = 0;
      const quantityModal = new bootstrap.Modal(document.getElementById('quantityModal'));
      quantityModal.show();
    },
    async updateQuantity() {
      if (isNaN(this.quantityChange) || this.quantityChange === 0) {
        alert('Please enter a valid quantity change.');
        return;
      }

      if (this.selectedProduct) {
        const response = await fetch('http://localhost:5000/api/inventory/update-quantity', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: this.selectedProduct.productId,
            quantityChange: this.quantityChange,

          }),
        });

        const data = await response.json();
        if (data.product) {
          this.selectedProduct.quantity = data.product.quantity;
          this.selectedProduct = null;
          const quantityModal = new bootstrap.Modal(document.getElementById('quantityModal'));
          quantityModal.hide();
        } else {
          alert('Failed to update quantity.');
        }
      }
    },
    openEditProductModal(product) {
      this.editableProduct = { ...product };
      const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
      editProductModal.show();
    },
    async updateProductDetails() {
      try {
        console.log('Product to update:', this.editableProduct); // Log to check the data
        const response = await fetch('http://localhost:5000/api/inventory/update-product', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.editableProduct), // Make sure this contains all necessary fields
        });

        const data = await response.json();
        if (data.product) {
          const index = this.products.findIndex(p => p.productId === data.product.productId);
          this.products.splice(index, 1, data.product);
          const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
          editProductModal.hide();
        }
      } catch (error) {
        console.error('Error updating product details:', error);
      }
    },
    async openHistoryModal(product) {
      this.selectedProduct = product;
      this.history = []; // Reset the history array
      const historyModal = new bootstrap.Modal(document.getElementById('historyModal'));
      historyModal.show();
      await this.getHistory(product.productId);
    },

    // Method to fetch the history of a specific product
    async getHistory(productId) {
      try {
        const response = await fetch(`http://localhost:5000/api/inventory/history/${productId}`);
        const data = await response.json();
        if (data.history) {
          this.history = data.history;
        } else {
          alert('No history found for this product.');
        }
      } catch (error) {
        console.error('Error fetching product history:', error);
        alert('Failed to fetch product history.');
      }
    },
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

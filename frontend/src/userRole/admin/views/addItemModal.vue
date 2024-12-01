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
        <div class="container mt-4">

          <form @submit.prevent="submitForm">
            <div class="row">
              <!-- Item ID -->
              <div class="col-md-6 mb-3">
                <label for="itemId" class="form-label">Item ID</label>
                <input
                  type="text"
                  id="itemId"
                  class="form-control"
                  v-model="newItem.itemId"
                  required
                />
              </div>

              <!-- Item Name -->
              <div class="col-md-6 mb-3">
                <label for="itemName" class="form-label">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  class="form-control"
                  v-model="newItem.itemName"
                  required
                />
              </div>
            </div>

            <div class="row">
              <!-- Category -->
              <div class="col-md-6 mb-3">
                <label for="category" class="form-label">Category</label>
                <select
                  id="category"
                  class="form-select"
                  v-model="newItem.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Medical Supply">Medical Supply</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              <!-- Quantity -->
            
            </div>

            <div class="row">
              <!-- Unit of Measure -->
              <div class="col-md-6 mb-3">
                <label for="unitOfMeasure" class="form-label">Unit of Measure</label>
                <select
                  id="unitOfMeasure"
                  class="form-select"
                  v-model="newItem.unitOfMeasure"
                  required
                >
                  <option value="Box">Box</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Pack">Pack</option>
                </select>
              </div>

              <!-- Expiration Date -->
              <div class="col-md-6 mb-3">
                <label for="expirationDate" class="form-label">Expiration Date</label>
                <input
                  type="date"
                  id="expirationDate"
                  class="form-control"
                  v-model="newItem.expirationDate"
                  required
                />
              </div>
            </div>

            <div class="row">
              <!-- Supplier -->
              <div class="col-md-6 mb-3">
                <label for="supplier" class="form-label">Supplier</label>
                <input
                  type="text"
                  id="supplier"
                  class="form-control"
                  v-model="newItem.supplier"
                  required
                />
              </div>

              <!-- Purchase Date -->
              <div class="col-md-6 mb-3">
                <label for="purchaseDate" class="form-label">Purchase Date</label>
                <input
                  type="date"
                  id="purchaseDate"
                  class="form-control"
                  v-model="newItem.purchaseDate"
                  required
                />
              </div>
            </div>


            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';

export default {
  name: "AddItem",
  components: {
    sideNav,
    topNav
  },
  data() {
    return {
      newItem: {
        itemId: "",
        itemName: "",
        category: "",
        unitOfMeasure: "Box", // Default value for unit of measure
        expirationDate: "", // Expiration date
        supplier: "", // Supplier name
        purchaseDate: "", // Purchase date
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inventory/add",
          this.newItem
        );

        console.log("Item added successfully:", response.data);
        alert("Item added successfully.");
        // Reset form fields
        this.newItem = {
          itemId: "",
          itemName: "",
          category: "",
          unitOfMeasure: "Box",
          expirationDate: "",
          supplier: "",
          purchaseDate: "",

        };
      } catch (error) {
        console.error(
          "Error adding item:",
          error.response?.data?.message || error.message
        );
        alert("Failed to add item. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Main content styling */
.page-content {
  display: flex;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
}

/* Form and input styling */
.modal-body label {
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.modal-body input,
.modal-body select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

/* Submit button */
.modal-body button {
  width: 100%;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-body button:hover {
  background-color: #0056b3;
}
</style>

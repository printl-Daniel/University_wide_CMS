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
            </div>

            <div class="row">
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
              <div class="col-md-12 mb-3">
                <label for="supplier" class="form-label">Supplier</label>
                <input
                  type="text"
                  id="supplier"
                  class="form-control"
                  v-model="newItem.supplier"
                  required
                />
              </div>
            </div>

            <!-- Submit Button -->
            <div class="row">
              <div class="col-md-12 text-end">
                <button type="submit" class="btn btn-primary">Add Product</button>
              </div>
            </div>
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
  color: #333;
  text-align: center;
}

/* Form container with box shadow */
form {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

/* Styling for the label */
label {
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
  color: #333;
}

/* Form input and select fields */
input,
select {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Input focus effect */
input:focus,
select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Submit button */
button {
  width: 100%;
  background-color: #007bff;
  color: white;
  font-size: 1.1rem;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;
}

/* Button hover and focus effects */
button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

/* Form grid layout for input fields */
.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-6 {
  flex: 1 0 48%;
  margin-right: 2%;
}

.col-md-6:last-child {
  margin-right: 0;
}

/* Add spacing for form elements */
.mb-3 {
  margin-bottom: 1.5rem;
}
.text-end {
  text-align: right;
}
</style>

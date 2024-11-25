<template>
  <div
    class="modal fade show"
    tabindex="-1"
    style="display: block"
    aria-hidden="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Product</h5>
          <button
            type="button"
            class="btn-close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
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
              <div class="col-md-6 mb-3">
                <label for="quantity" class="form-label">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  class="form-control"
                  v-model="newItem.quantity"
                  required
                  min="1"
                />
              </div>
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

            <div class="row">
              <!-- Cost Per Unit -->
              <div class="col-md-6 mb-3">
                <label for="costPerUnit" class="form-label">Cost Per Unit</label>
                <input
                  type="number"
                  id="costPerUnit"
                  class="form-control"
                  v-model="newItem.costPerUnit"
                  required
                  min="0"
                  step="0.01"
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
export default {
  data() {
    return {
      newItem: {
        itemId: "",
        itemName: "",
        category: "",
        quantity: 0,
        unitOfMeasure: "Box", // Default value for unit of measure
        expirationDate: "", // Expiration date
        supplier: "", // Supplier name
        purchaseDate: "", // Purchase date
        costPerUnit: 0, // Cost per unit
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
        this.$emit("itemAdded", response.data.item); // Emit success event
        this.$emit("close"); // Close the modal

        // Reset form fields
        this.newItem = {
          itemId: "",
          itemName: "",
          category: "",
          quantity: 0,
          unitOfMeasure: "Box",
          expirationDate: "",
          supplier: "",
          purchaseDate: "",
          costPerUnit: 0,
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
/* Modal backdrop styling */
.modal {
  background-color: rgba(0, 0, 0, 0.5); /* Dimmed background */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal dialog */
.modal-dialog {
  max-width: 800px; /* Increased dialog width */
  width: 100%;
  margin: 20px auto;
}

/* Modal content styling */
.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative; /* Ensure positioning for close button */
}

/* Header styling */
.modal-header {
  background-color: #007bff;
  color: #ffffff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header .modal-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.modal-header .btn-close {
  border: none;
  color: #000000;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 16px;
}

.modal-header .btn-close:hover {
  color: #ffcccc;
}

/* Body styling */
.modal-body {
  padding: 20px;
}

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

/* Grid layout */
.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-6 {
  width: 50%; /* Half-width for each input */
  padding: 10px;
}

.col-md-12 {
  width: 100%;
  padding: 10px;
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

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
            <!-- Item ID -->
            <div class="mb-3">
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
            <div class="mb-3">
              <label for="itemName" class="form-label">Item Name</label>
              <input
                type="text"
                id="itemName"
                class="form-control"
                v-model="newItem.itemName"
                required
              />
            </div>

            <!-- Price -->
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input
                type="number"
                id="price"
                class="form-control"
                v-model="newItem.price"
                required
                min="0"
                step="0.01"
              />
            </div>

            <!-- Category -->
            <div class="mb-3">
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
            <div class="mb-3">
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

            <!-- Unit -->
            <div class="mb-3">
              <label for="unit" class="form-label">Unit</label>
              <select
                id="unit"
                class="form-select"
                v-model="newItem.unit"
                required
              >
                <option value="Box">Box</option>
                <option value="Bottle">Bottle</option>
                <option value="Pack">Pack</option>
              </select>
            </div>

            <!-- Threshold -->
            <div class="mb-3">
              <label for="threshold" class="form-label">Threshold</label>
              <input
                type="number"
                id="threshold"
                class="form-control"
                v-model="newItem.threshold"
                required
                min="0"
              />
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
        price: 0,
        category: "",
        quantity: 0,
        unit: "Box",
        threshold: 5,
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/inventory/add-item",
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
          price: 0,
          category: "",
          quantity: 0,
          unit: "Box",
          threshold: 5,
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
  max-width: 500px;
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

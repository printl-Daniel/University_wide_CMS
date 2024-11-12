<template>
  <div class="modal fade show" tabindex="-1" style="display: block;" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Product</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <!-- Item ID -->
            <div class="mb-3">
              <label for="itemId" class="form-label">Item ID</label>
              <input type="text" class="form-control" v-model="newItem.itemId" required />
            </div>

            <!-- Item Name -->
            <div class="mb-3">
              <label for="itemName" class="form-label">Item Name</label>
              <input type="text" class="form-control" v-model="newItem.itemName" required />
            </div>

            <!-- Category -->
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <select class="form-select" v-model="newItem.category" required>
                <option value="Medicine">Medicine</option>
                <option value="Medical Supply">Medical Supply</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>

            <!-- Quantity -->
            <div class="mb-3">
              <label for="quantity" class="form-label">Quantity</label>
              <input type="number" class="form-control" v-model="newItem.quantity" required min="1" />
            </div>

            <!-- Unit -->
            <div class="mb-3">
              <label for="unit" class="form-label">Unit</label>
              <select class="form-select" v-model="newItem.unit" required>
                <option value="Box">Box</option>
                <option value="Bottle">Bottle</option>
                <option value="Pack">Pack</option>
              </select>
            </div>

            <!-- Threshold -->
            <div class="mb-3">
              <label for="threshold" class="form-label">Threshold</label>
              <input type="number" class="form-control" v-model="newItem.threshold" required min="1" />
            </div>

            <!-- Status -->
            <div class="mb-3">
              <label for="status" class="form-label">Status</label>
              <select class="form-select" v-model="newItem.status" required>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
              </select>
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
import axios from 'axios';
export default {
  data() {
    return {
      newItem: {
        itemId: '',
        itemName: '',
        category: '',
        quantity: 0,
        unit: 'Box',
        threshold: 5, // Default threshold value
        status: 'In Stock', // Set default valid status
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        // Validate that the required fields are populated
        if (!this.newItem.itemId || !this.newItem.itemName || !this.newItem.category || !this.newItem.quantity) {
          alert('Please fill all the required fields.');
          return;
        }

        // Sending a POST request to the API to add a new inventory item
        const response = await axios.post('http://localhost:5000/api/inventory/add-item', this.newItem);
        
        // Handle success response
        console.log('Item added successfully:', response.data);
        this.$emit('itemAdded', response.data.item);  // Emit success event
        this.$emit('close');  // Close the modal

        // Reset form fields
        this.newItem = {
          itemId: '',
          itemName: '',
          category: '',
          quantity: 0,
          unit: 'Box',
          threshold: 5,
          status: 'In Stock', // Reset to valid default status
        };
      } catch (error) {
        console.error('Error adding item:', error.response?.data?.message || error.message);
        alert('Failed to add item. Please try again.');
      }
    },
  },
};
</script>

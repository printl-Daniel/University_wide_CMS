<template>
  <div class="modal fade show" tabindex="-1" style="display: block;" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update Item</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <!-- Item ID -->
            <div class="mb-3">
              <label for="itemId" class="form-label">Item ID</label>
              <input type="text" id="itemId" class="form-control" v-model="selectedItem.itemId" disabled/>
            </div>

            <!-- Item Name -->
            <div class="mb-3">
              <label for="itemName" class="form-label">Item Name</label>
              <input type="text" id="itemName" class="form-control" v-model="selectedItem.itemName" required />
            </div>

            <!-- Category -->
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <select id="category" class="form-select" v-model="selectedItem.category" required>
                <option value="" disabled>Select a category</option>
                <option value="Medicine">Medicine</option>
                <option value="Medical Supply">Medical Supply</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>

            <!-- Quantity (disabled but included in the request) -->
            <div class="mb-3">
              <label for="quantity" class="form-label">Quantity</label>
              <input type="number" id="quantity" class="form-control" v-model="selectedItem.quantity" required min="1" disabled />
              <input type="hidden" v-model="selectedItem.quantity" />
            </div>

            <!-- Unit -->
            <div class="mb-3">
              <label for="unit" class="form-label">Unit</label>
              <select id="unit" class="form-select" v-model="selectedItem.unitOfMeasure" required>
                <option value="Box">Box</option>
                <option value="Bottle">Bottle</option>
                <option value="Pack">Pack</option>
              </select>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
    <!-- Success Modal -->
    <SuccessModal
      :title="'Success'"
      :message="'Item updated successfully!'"
      :visible="successModalVisible"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import SuccessModal from './sucessModal.vue';
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    SuccessModal,
  },
  data() {
    return {
      selectedItem: { ...this.item },
      successModalVisible: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.put(`http://localhost:5000/api/inventory/update-item/${this.selectedItem.itemId}`, this.selectedItem);
        console.log('Item updated successfully:', response.data);
        this.$emit('item-updated', response.data.item);
        this.successModalVisible = true; 
        this.$emit('close');
      } catch (error) {
        console.error('Error updating item:', error.response?.data?.message || error.message);
        alert('Failed to update item. Please try again.');
      }
    },
    closeSuccessModal() {
      this.successModalVisible = false;
    },
  },
};
</script>

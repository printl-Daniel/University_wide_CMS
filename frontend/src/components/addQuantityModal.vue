<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <h4>Add Quantity to {{ selectedItem.itemName }}</h4> <!-- Show selected item name -->
      
      <!-- Display the item details -->
      <div class="item-details">
        <p><strong>Item ID:</strong> {{ selectedItem.itemId }}</p>
        <p><strong>Current Quantity:</strong> {{ selectedItem.quantity }}</p>
        <p><strong>Supplier:</strong> {{ selectedItem.supplier }}</p>
      </div>

      <!-- Form to add quantity -->
      <form @submit.prevent="addQuantity">
        <div>
          <label for="quantityToAdd">Quantity to Add:</label>
          <input
            type="number"
            id="quantityToAdd"
            v-model="quantityToAdd"
            min="1"
            required
          />
        </div>
        <div>
          <label for="responsiblePerson">Responsible Person:</label>
          <input
            type="text"
            id="responsiblePerson"
            v-model="responsiblePerson"
            required
          />
        </div>

        <!-- Custom Alert Message -->
        <div v-if="message" :class="{'alert-success': isSuccess, 'alert-error': !isSuccess}" class="alert">
          {{ message }}
        </div>

        <!-- Modal Footer with Buttons -->
        <div class="modal-footer">
          <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
            Add Quantity
          </button>
          <button type="button" @click="closeModal" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    selectedItem: Object,
    showModal: Boolean,
  },
  data() {
    return {
      quantityToAdd: 0,
      responsiblePerson: "",
      isSubmitting: false,
      message: "",   // Used to show success or error messages
      isSuccess: true,  // Flag to determine success or failure
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async addQuantity() {
      if (this.isSubmitting) return;

      this.isSubmitting = true;
      this.message = "";  // Reset previous message before trying

      try {
        const response = await axios.put(
          `http://localhost:5000/api/inventory/add-quantity/${this.selectedItem.itemId}`, 
          {
            quantityToAdd: this.quantityToAdd,
            responsiblePerson: this.responsiblePerson,
          }
        );

        this.$emit("quantity-added", response.data.item);
        this.closeModal();

        // Set success message
        this.message = "Quantity added successfully!";
        this.isSuccess = true;
      } catch (error) {
        console.error("Error adding quantity:", error.response ? error.response.data : error.message);

        // Set error message
        this.message = error.response ? error.response.data.message : "Unexpected error occurred.";
        this.isSuccess = false;
      } finally {
        this.isSubmitting = false;
      }
    }
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.item-details {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.alert {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>

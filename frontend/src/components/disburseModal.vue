<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <h4>Disburse Item: {{ selectedItem.itemName }}</h4>

      <!-- Display the item details -->
      <div class="item-details">
        <p><strong>Item ID:</strong> {{ selectedItem.itemId }}</p>
        <p><strong>Current Quantity:</strong> {{ selectedItem.quantity }}</p>
        <p><strong>Category:</strong> {{ selectedItem.category }}</p>
      </div>

      <!-- Form to disburse item -->
      <form @submit.prevent="disburseItem">
        <div>
          <label for="quantityToDisburse">Quantity to Disburse:</label>
          <input
            type="number"
            id="quantityToDisburse"
            v-model="quantityToDisburse"
            :max="selectedItem.quantity"
            min="1"
            required
          />
        </div>
        <div>
          <label for="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            v-model="patientName"
            required
          />
        </div>
        <div>
          <label for="college">College:</label>
          <select id="college" v-model="college" required>
            <option value="" disabled>Select College</option>
            <option value="BSIT">BSIT</option>
            <option value="CBM">CBM</option>
            <option value="EDUC">EDUC</option>
            <option value="BTVLED">BTVLED</option>
            <option value="CAS">CAS</option>
            <option value="CCJE">CCJE</option>
          </select>
        </div>
        <div>
          <label for="reason">Reason for Disbursement:</label>
          <textarea
            id="reason"
            v-model="reason"
            rows="3"
            required
          ></textarea>
        </div>

        <!-- Custom Alert Message -->
        <div v-if="message" :class="{'alert-success': isSuccess, 'alert-error': !isSuccess}" class="alert">
          {{ message }}
        </div>

        <!-- Modal Footer with Buttons -->
        <div class="modal-footer">
          <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
            Disburse Item
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
      quantityToDisburse: 0,
      patientName: "",
      college: "",  // College selected from dropdown
      reason: "",
      isSubmitting: false,
      message: "",
      isSuccess: true,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async disburseItem() {
      if (this.isSubmitting) return;

      this.isSubmitting = true;
      this.message = ""; // Reset previous message

      try {
        const response = await axios.put(
          `http://localhost:5000/api/inventory/disburse/${this.selectedItem.itemId}`, 
          {
            quantityToDisburse: this.quantityToDisburse,
            patientName: this.patientName,
            reason: this.reason,
            college: this.college, // No need to send date, backend handles it
          }
        );

        // Emit the updated item data to parent component
        this.$emit("item-disbursed", response.data.item); 

        this.closeModal();

        // Success message
        this.message = "Item successfully disbursed!";
        this.isSuccess = true;
      } catch (error) {
        console.error("Error disbursing item:", error.response ? error.response.data : error.message);

        // Error message
        this.message = error.response ? error.response.data.message : "Unexpected error occurred.";
        this.isSuccess = false;
      } finally {
        this.isSubmitting = false;
      }
    },
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

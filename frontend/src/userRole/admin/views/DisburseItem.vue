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
          <h2 class="title">Reduce Stock</h2>
          <form @submit.prevent="handleReduceStock" class="form-container">
            <div class="form-group">
              <label for="itemId" class="form-label">Item ID</label>
              <input
                v-model="itemId"
                type="text"
                id="itemId"
                class="form-control"
                placeholder="Enter item ID"
                required
              />
            </div>
            <div class="form-group">
              <label for="quantity" class="form-label">Quantity</label>
              <input
                v-model="quantity"
                type="number"
                id="quantity"
                class="form-control"
                min="1"
                placeholder="Enter quantity"
                required
              />
            </div>
            <div class="form-group">
              <label for="patientName" class="form-label">Patient Name</label>
              <input
                v-model="patientName"
                type="text"
                id="patientName"
                class="form-control"
                placeholder="Enter patient's name"
                required
              />
            </div>
            <div class="form-group">
              <label for="reason" class="form-label">Reason</label>
              <input
                v-model="reason"
                type="text"
                id="reason"
                class="form-control"
                placeholder="Enter the reason"
                required
              />
            </div>
            <div class="form-group">
              <label for="college" class="form-label">College</label>
              <select
                v-model="college"
                id="college"
                class="form-control"
                required
              >
                <option value="" disabled>Select a college</option>
                <option value="BSIT">BSIT</option>
                <option value="CBM">CBM</option>
                <option value="EDUC">EDUC</option>
                <option value="BTVLED">BTVLED</option>
                <option value="CAS">CAS</option>
                <option value="CCJE">CCJE</option>
              </select>
            </div>
            <button type="submit" class="btn-submit">Reduce Stock</button>
          </form>
          <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sideNav from "../components/sideNav.vue";
import topNav from "../components/topNav.vue";

export default {
  name: "ReduceStock",
  components: {
    sideNav,
    topNav,
  },
  data() {
    return {
      itemId: "",
      quantity: 0,
      patientName: "",
      reason: "",
      college: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleReduceStock() {
      try {
        // Reset messages
        this.errorMessage = "";
        this.successMessage = "";

        // Validate input
        if (
          !this.itemId ||
          this.quantity <= 0 ||
          !this.patientName.trim() ||
          !this.reason.trim() ||
          !this.college // Ensure a college is selected
        ) {
          this.errorMessage =
            "All fields are required, and quantity must be greater than zero.";
          return;
        }

        // Make API request
        const response = await axios.post("/api/reduce-stock", {
          itemId: this.itemId,
          quantity: this.quantity,
          patientName: this.patientName,
          reason: this.reason,
          college: this.college,
        });

        // Handle success
        this.successMessage = `Successfully reduced ${this.quantity} units of stock for item ID ${response.data.id}, assigned to patient ${this.patientName}.`;

        // Reset form
        this.itemId = "";
        this.quantity = 0;
        this.patientName = "";
        this.reason = "";
        this.college = "";
      } catch (error) {
        // Handle errors
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "An error occurred while reducing stock.";
        }
        console.error(error); // Log the error for debugging
      }
    },
  },
};
</script>

<style scoped>
.page-content {
  display: flex;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

button.btn-submit {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button.btn-submit:hover {
  background-color: #0056b3;
}

.text-danger {
  color: red;
}

.text-success {
  color: green;
}
</style>

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
            <h2>Reduce Stock</h2>
            <form @submit.prevent="handleReduceStock">
              <div class="mb-3">
                <label for="itemId" class="form-label">Item ID:</label>
                <input
                  v-model="itemId"
                  type="text"
                  id="itemId"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="quantity" class="form-label">Quantity:</label>
                <input
                  v-model="quantity"
                  type="number"
                  id="quantity"
                  class="form-control"
                  min="1"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="patientName" class="form-label">Patient Name:</label>
                <input
                  v-model="patientName"
                  type="text"
                  id="patientName"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Reduce Stock</button>
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
          if (!this.itemId || this.quantity <= 0 || !this.patientName.trim()) {
            this.errorMessage =
              "All fields are required, and quantity must be greater than zero.";
            return;
          }
  
          // Make API request
          const response = await axios.post("/api/reduce-stock", {
            itemId: this.itemId,
            quantity: this.quantity,
            patientName: this.patientName,
          });
  
          // Handle success
          this.successMessage = `Successfully reduced ${this.quantity} units of stock for item ID ${response.data.id}, assigned to patient ${this.patientName}.`;
  
          // Reset form
          this.itemId = "";
          this.quantity = 0;
          this.patientName = "";
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
    max-width: 800px;
    margin: 0 auto;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: bold;
  }
  
  .text-danger {
    color: red;
  }
  
  .text-success {
    color: green;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  
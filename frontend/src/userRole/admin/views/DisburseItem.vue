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
                  v-model="disburseItem.itemId"
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
                  v-model="disburseItem.itemName"
                  required
                  disabled
                />
              </div>
            </div>

            <div class="row">
              <!-- Quantity to Disburse -->
              <div class="col-md-6 mb-3">
                <label for="quantity" class="form-label">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  class="form-control"
                  v-model="disburseItem.quantity"
                  min="1"
                  required
                />
              </div>

              <!-- Patient Name -->
              <div class="col-md-6 mb-3">
                <label for="patientName" class="form-label">Patient Name</label>
                <input
                  type="text"
                  id="patientName"
                  class="form-control"
                  v-model="disburseItem.patientName"
                  required
                />
              </div>
            </div>

            <div class="row">
              <!-- Reason for Disbursement -->
              <div class="col-md-6 mb-3">
                <label for="reason" class="form-label">Reason</label>
                <input
                  type="text"
                  id="reason"
                  class="form-control"
                  v-model="disburseItem.reason"
                  required
                />
              </div>

              <!-- College -->
              <div class="col-md-6 mb-3">
                <label for="college" class="form-label">College</label>
                <select
                  id="college"
                  class="form-select"
                  v-model="disburseItem.college"
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
            </div>

            <!-- Submit Button -->
            <div class="row">
              <div class="col-md-12 text-end">
                <button type="submit" class="btn btn-primary">Disburse Medication</button>
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
import sideNav from "../components/sideNav.vue";
import topNav from "../components/topNav.vue";

export default {
  name: "DisburseMedication",
  components: {
    sideNav,
    topNav,
  },
  data() {
    return {
      disburseItem: {
        itemId: "", // The item ID to be dispensed
        itemName: "", // The item name (this will be fetched from backend)
        quantity: 1, // Quantity to be dispensed
        patientName: "", // Name of the patient
        reason: "", // Reason for disbursement
        college: "", // College of the student
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        // Reset messages (not implemented in the template, but you can add success/error messages if needed)
        const response = await axios.post("http://localhost:5000/api/disburse", this.disburseItem);

        console.log("Disbursement successful:", response.data);
        alert("Medication dispensed successfully.");

        // Reset form fields after success
        this.disburseItem = {
          itemId: "",
          itemName: "",
          quantity: 1,
          patientName: "",
          reason: "",
          college: "",
        };
      } catch (error) {
        console.error("Error dispensing medication:", error.response?.data?.message || error.message);
        alert("Failed to dispense medication. Please try again.");
      }
    },

    // Fetch item details by itemId to auto-populate item name
    async fetchItemDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/api/inventory/${this.disburseItem.itemId}`);
        if (response.data) {
          this.disburseItem.itemName = response.data.itemName;
        }
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      }
    },
  },
  watch: {
    "disburseItem.itemId": function(newItemId) {
      if (newItemId) {
        this.fetchItemDetails();
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

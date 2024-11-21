<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content d-flex">
      <!-- Sidebar -->
      <div class="sidebar">
        <sideNav />
      </div>

      <!-- Main Content Section -->
      <div class="content flex-grow-1">
        <!-- Patient Records Section -->
        <div class="patient-records-container">
          <h2 class="section-title">Patient Records</h2>

          <!-- Search Functionality -->
          <div class="search-container">
            <label for="search" class="search-label">Search Patient by Name or ID</label>
            <input
              type="text"
              id="search"
              v-model="searchQuery"
              class="form-control"
              placeholder="Enter patient name or ID"
            />
            <button class="btn search-btn" @click="searchPatient">Search</button>
          </div>

          <!-- Patient Record Table -->
          <div v-if="patients.length > 0" class="patient-table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Medical History</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(patient, index) in patients" :key="index">
                  <td>{{ patient.id }}</td>
                  <td>{{ patient.fullName }}</td>
                  <td>{{ patient.age }}</td>
                  <td>{{ patient.gender }}</td>
                  <td>
                    <button
                      class="btn btn-info"
                      @click="viewPatientHistory(patient.id)"
                    >
                      View History
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- No Results Found Message -->
          <div v-else class="no-results">
            <p>No patients found matching your search query.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import topNav from "../components/topNav.vue"; // Assuming you have topNav component
import sideNav from "../components/sideNav.vue"; // Assuming you have sideNav component

export default {
  components: {
    topNav,
    sideNav
  },
  data() {
    return {
      searchQuery: "",
      patients: [],
    };
  },
  methods: {
    // Simulate searching for a patient by name or ID (you can connect to your API here)
    searchPatient() {
      if (this.searchQuery) {
        // Dummy data for demonstration, replace with real search logic
        this.patients = [
          { id: "001", fullName: "John Doe", age: 30, gender: "Male" },
          { id: "002", fullName: "Jane Smith", age: 25, gender: "Female" },
        ];
      } else {
        this.patients = [];
      }
    },
    // Simulate viewing patient history (you can replace this with actual data fetching)
    viewPatientHistory(patientId) {
      alert(`Viewing medical history for patient with ID: ${patientId}`);
      // You can redirect to a detailed history page if necessary
    },
  },
};
</script>

<style scoped>
/* Patient Records Section */
.patient-records-container {
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #fafafa;
}

.section-title {
  font-size: 2rem;
  color: #2e7d32;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.search-label {
  margin-bottom: 10px;
  font-size: 1rem;
  color: #333;
}

.form-control {
  width: 300px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.search-btn {
  width: 150px;
  padding: 10px;
  font-size: 1rem;
  background-color: #388e3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #2c6e2d;
}

/* Patient Records Table */
.patient-table-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: #388e3c;
  color: white;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table button {
  padding: 8px;
  background-color: #388e3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.table button:hover {
  background-color: #2c6e2d;
}

/* No Results Found */
.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

</style>

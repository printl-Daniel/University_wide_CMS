<template>
  <div>
    <!-- Top Navbar -->
    <div class="header">
      <TopNav />
    </div>

    <!-- Main Content Section with Sidebar and Content Area -->
    <div class="page-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <SideNav />
      </div>

      <!-- Main Content -->
      <div class="content flex-grow-1">
        <!-- Patient History Container -->
        <div class="patient-history-container">
          <!-- Title -->
          <h2 class="history-title">Patient Medical History</h2>

          <!-- Patient Information Section -->
          <div class="patient-info">
            <h4>Patient Information</h4>
            <p><strong>Name:</strong> {{ patient.name }}</p>
            <p><strong>Date of Birth:</strong> {{ patient.dob }}</p>
            <p><strong>Contact Information:</strong> {{ patient.contactInfo }}</p>
          </div>

          <!-- Medical History Section -->
          <div class="history-list">
            <h4>Medical History</h4>
            <table v-if="medicalHistory.length > 0" class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  <th>Treatment</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(record, index) in medicalHistory" :key="index">
                  <td>{{ record.date }}</td>
                  <td>{{ record.diagnosis }}</td>
                  <td>{{ record.treatment }}</td>
                  <td>{{ record.notes }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else>No medical history records available.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "../components/topNav.vue";
import SideNav from "../components/sideNav.vue";

export default {
  components: {
    TopNav,
    SideNav,
  },
  data() {
    return {
      patient: {
        name: "",  // Dynamically assigned patient name
        dob: "",   // Dynamically assigned patient date of birth
        contactInfo: "",  // Dynamically assigned patient contact info
      },
      medicalHistory: [],  // Dynamically fetched medical history data
    };
  },
};
</script>

<style scoped>

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

.patient-history-container {
  padding: 20px;
  max-width: 800px;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.history-title {
  color: #388e3c;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: bold;
}

.patient-info {
  margin-bottom: 30px;
}

.patient-info h4 {
  font-size: 1.5rem;
  color: #333;
}

.history-list {
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: #388e3c;
  color: white;
}

p {
  font-size: 1.1rem;
  color: #555;
}
</style>

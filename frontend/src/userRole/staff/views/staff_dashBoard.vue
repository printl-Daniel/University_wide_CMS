<template>
  <div>
    <navBar />
  </div>
  <div class="container-fluid">
    <!-- Sidebar Component -->
    <div class="sidebar">
      <!-- You can include links to other sections of the dashboard -->
    </div>

    <!-- Dashboard Content -->
    <div class="dashboard">
      <div class="main-content">
        <div class="content">
          <h2>Staff Dashboard</h2>
          <p>Welcome, Staff! Manage inventory and reports here.</p>

          <!-- Quick Stats Section -->
          <div class="quick-stats">
            <div class="stat-item">
              <h4>Total Patients</h4>
              <p>{{ totalPatients }}</p>
            </div>
            <div class="stat-item">
              <h4>Total Inventory Items</h4>
              <p>{{ totalItems }}</p>
            </div>
            <div class="stat-item">
              <h4>Low Stock Alerts</h4>
              <p>{{ lowStockAlerts }}</p>
            </div>
          </div>

          <!-- Recent Activities Section -->
          <div class="recent-activities">
            <h4>Recent Activities</h4>
            <ul>
              <li v-for="activity in recentActivities" :key="activity.id">
                {{ activity.description }} on {{ activity.date }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/staff_navbar.vue";

export default {
  components: {
    navBar,
  },
  data() {
    return {
      totalPatients: 0, // This will be dynamically fetched from the backend
      totalItems: 0, // This will be dynamically fetched from the backend
      lowStockAlerts: 0, // This will be dynamically fetched from the backend
      recentActivities: [], // This will be dynamically fetched from the backend
    };
  },
  methods: {
    fetchDashboardData() {
      // Example of fetching data from the backend
      // Replace with real API calls to get the data from your server
      this.totalPatients = 120; // Replace with real data from your patients table
      this.totalItems = 150; // Replace with real data from your inventory table
      this.lowStockAlerts = 5; // Example: count of items with low stock
      this.recentActivities = [
        { id: 1, description: "Updated inventory stock", date: "2024-10-10" },
        { id: 2, description: "Added new patient record", date: "2024-10-09" },
      ];
    },
  },
  mounted() {
    this.fetchDashboardData(); // Fetch the data when the component is mounted
  },
};
</script>

<style scoped>
.container-fluid {
  display: flex;
}

.sidebar {
  background-color: #f8f9fa;
  padding: 20px;
  height: 100vh;
}

.dashboard-content {
  padding: 20px;
}

.quick-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-item {
  background-color: #f1f1f1;
  padding: 10px;
  width: 30%;
  border-radius: 8px;
}

.recent-activities {
  margin-top: 20px;
}

.recent-activities ul {
  list-style-type: none;
}

.recent-activities li {
  margin-bottom: 10px;
}

h4 {
  margin-bottom: 10px;
}
</style>

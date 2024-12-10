<template>
  <div>
    <!-- Admin Navbar (Top Navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content d-flex">
      <div class="sidebar">
        <sideNav />
      </div>

      <div class="content flex-grow-1">
        <h2>Dashboard</h2>

        <!-- Overview Section -->
        <div class="row g-4 mt-3">
          <!-- Total Disbursements Card -->
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Total Disbursements</h3>
                <p class="card-text">{{ totalDisbursements }} Disbursements</p>
              </div>
            </div>
          </div>

          <!-- Current Inventory Card -->
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Current Inventory</h3>
                <p class="card-text">{{ currentInventory }} Items Available</p>
              </div>
            </div>
          </div>

          <!-- Total Quantity Disbursed Card -->
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Total Quantity Disbursed</h3>
                <p class="card-text">{{ totalQuantityDisbursed }} Items</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity Section -->
        <h3>Recent Activity</h3>
        <table id="recentDisbursements" class="table table-striped">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Patient Name</th>
              <th>Reason</th>
              <th>College</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="disbursement in recentDisbursements" :key="disbursement._id">
              <td>{{ disbursement.itemName }}</td>
              <td>{{ disbursement.quantity }}</td>
              <td>{{ disbursement.patientName }}</td>
              <td>{{ disbursement.reason }}</td>
              <td>{{ disbursement.college }}</td>
              <td>{{ new Date(disbursement.date).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Notifications Section -->
        <div class="row mt-4">
          <!-- Low Stock Alerts -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Low Stock Alerts</h5>
                <div v-if="notifications.length > 0">
                  <h3>Low Stock Notifications</h3>
                  <ul>
                    <li v-for="notification in notifications" :key="notification._id">
                      {{ notification.message }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>No low stock notifications</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Expiration Alerts -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Expiration Alerts</h5>
                <ul>
                  <li v-for="item in expiringItems" :key="item.itemId">{{ item.itemName }} - Expiring on {{ new Date(item.expirationDate).toLocaleDateString() }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';

export default {
  components: {
    sideNav,
    topNav
  },
  data() {
    return {
      totalDisbursements: 0, // Replace with actual data
      currentInventory: 100, // Replace with actual data
      totalQuantityDisbursed: 0, // Replace with actual data
      recentDisbursements: [], // Replace with API data
      lowStockItems: [], // Replace with low stock data
      expiringItems: [], // Replace with expiring items data
      notifications: [] // Store notifications
    };
  },
  methods: {
    async fetchNotifications() {
      try {
        //const response = await axios.get("http://localhost:5000/api/inventory/notifications");
        this.notifications = response.data.notifications;
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  },
  mounted() {
  this.fetchNotifications();
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1.2rem;
  color: #555;
}

.table {
  margin-top: 20px;
  width: 100%;
}

.card-body ul {
  list-style-type: none;
  padding: 0;
}

.card-body li {
  padding: 5px;
  font-size: 1rem;
}

/* For responsive layout */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    margin-bottom: 15px;
  }
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  color: #007bff;
}

.card-body {
  background-color: #f8f9fa;
}

.card:hover .card-body {  
  background-color: #e9ecef;
}
</style>

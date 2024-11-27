<template>
  <div>
    <!-- Admin Navbar (Top Navbar) -->
    <div class="header">
      <topNav />
    </div>
    
    <div class="page-content d-flex">
      <!-- Sidebar -->
      <sideNav />
      
      <!-- Main Content (flex-grow-1) -->
      <div class="content flex-grow-1">
        <!-- Transaction History Table Section -->
        <div class="card mt-4">
          <div class="card-header">
            <h2>Transaction History</h2>
          </div>
          <div class="card-body">
            <!-- Transaction History Table -->
            <div class="table-responsive">
              <table id="transactionHistory" class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Transaction Date</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Action Type</th>
                    <th scope="col">Quantity Changed</th>
                    <th scope="col">Remaining Quantity</th>
                    <th scope="col">Responsible Person</th>
                    <th scope="col">Reason for Action</th>
                    <th scope="col">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="history in transactionHistory" :key="history.transactionId">
                    <td>{{ history.transactionId }}</td>
                    <td>{{ formatDate(history.transactionDate) }}</td>
                    <td>{{ history.itemName }}</td>
                    <td>{{ history.actionType }}</td>
                    <td>{{ history.quantityChanged }}</td>
                    <td>{{ history.remainingQuantity }}</td>
                    <td>{{ history.responsiblePerson }}</td>
                    <td>{{ history.reasonForAction }}</td>
                    <td>{{ history.supplier }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';

export default {
  components: {
    sideNav,
    topNav
  },
  data() {
    return {
      transactionHistory: [], // Stores the history data
    };
  },
  methods: {
    // Fetch transaction history from the API
    async fetchHistory() {
      try {
        const res = await axios.get('http://localhost:5000/api/inventory/history');
        if (res.data.success) {
          this.transactionHistory = res.data.data; // Assuming 'data' contains the history array
          this.initializeDataTable(); // Initialize DataTable after data is loaded
        } else {
          console.error('Failed to fetch history:', res.data.message);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    },

    // Format the date to a readable format
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short', // e.g., "Mon"
        year: 'numeric',  // e.g., "2024"
        month: 'short',   // e.g., "Nov"
        day: 'numeric'    // e.g., "25"
      });
    },

    // Initialize DataTable
    initializeDataTable() {
      $(document).ready(function () {
        $('#transactionHistory').DataTable({
          searching: true,  // Enable search functionality
          paging: true,     // Enable pagination
          ordering: true,   // Enable column sorting
          info: true,       // Show info like "Showing 1 to 10 of 100 entries"
        });
      });
    }
  },
  mounted() {
    // Fetch transaction history data when the component is mounted
    this.fetchHistory();
  }
};
</script>

<style scoped>
/* Main content styling */
.content {
  flex-grow: 1;
  padding: 20px;
}

/* Card Styling */
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

.card-header {
  background-color: #f5f5f5;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 15px;
}

h2 {
  margin: 0;
  font-size: 1.2rem;  /* Smaller font size for title */
  font-weight: bold;
  color: #333;
}

/* Table Styles */
.table-responsive {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 6px;  /* Reduced padding for smaller table size */
  font-size: 0.9rem;  /* Smaller font size */
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

/* Button styling */
button {
  display: none;
}

button:focus {
  outline: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .table {
    font-size: 0.85rem;  /* Smaller font on mobile */
  }

  .table th, .table td {
    padding: 5px;  /* Reduced padding for mobile */
  }
}
</style>

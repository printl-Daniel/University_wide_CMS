<template>
  <div>
    <!-- Admin Navbar (Top Navbar) -->
    <div class="header">
      <topNav />
    </div>
    
    <div class="page-content d-flex">
      <!-- Sidebar -->
      <sideNav />
      
      <!-- Main Content Area -->
      <div class="content flex-grow-1">
        <!-- Transaction History Table Section -->
        <div class="mt-4 table-responsive">
          <table id="transactionHistoryTable" class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Transaction ID</th>
                <th scope="col">Transaction Date</th>
                <th scope="col">Item Name</th>
                <th scope="col">Action Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Current Quantity</th>
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
        $('#transactionHistoryTable').DataTable({
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

/* Table Styles */
.table-responsive {
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem; /* Reduced font size */
}

th, td {
  padding: 6px;  /* Reduced padding for compact view */
  text-align: left;
  border-bottom: 1px solid #ada9a9;
}

th {
  color: white;
  text-transform: uppercase;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #f1f1f1; /* Highlight row on hover */
}

.table tbody tr:last-child td {
  border-bottom: none;
}

/* Button styling (if any buttons are present in the table rows) */
button {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:focus {
  outline: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .table {
    font-size: 0.75rem;  /* Even smaller font size for mobile */
  }

  .table th, .table td {
    padding: 5px;  /* Reduced padding for mobile */
  }
}
</style>

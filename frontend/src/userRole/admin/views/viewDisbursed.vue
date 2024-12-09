<template>
  <div>
    <!-- Admin Navbar (Top Navbar) -->
    <div class="header">
      <topNav />
    </div>

    <!-- Page Content (Main Content with Sidebar) -->
    <div class="page-content d-flex">
      <!-- Sidebar -->
      <div class="sidebar">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="content flex-grow-1">
        <h3>Disbursement History</h3>

        <!-- Table for disbursements (Using DataTables) -->
        <div class="table-responsive">
          <table id="disbursementTable" class="display table table-striped table-bordered">
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
              <tr v-for="disbursement in disbursements" :key="disbursement._id">
                <td>{{ disbursement.itemName }}</td>
                <td>{{ disbursement.quantity }}</td>
                <td>{{ disbursement.patientName }}</td>
                <td>{{ disbursement.reason }}</td>
                <td>{{ disbursement.college }}</td>
                <td>{{ new Date(disbursement.date).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import topNav from "../components/topNav.vue";
import sideNav from "../components/sideNav.vue";


export default {
  components: {
    topNav,
    sideNav
  },
  data() {
    return {
      disbursements: [],
    };
  },
  methods: {
    async fetchDisbursements() {
      try {
        const response = await axios.get("http://localhost:5000/api/inventory/disbursements");
        this.disbursements = response.data;
      } catch (error) {
        console.error("Error fetching disbursements:", error);
      }
    },
    initializeDataTable() {
      // Initialize DataTable after data is loaded
      if (this.disbursements.length > 0) {
        $('#disbursementTable').DataTable({
          responsive: true, // Make table responsive on smaller screens
          pageLength: 10, // Set number of rows per page
          lengthMenu: [10, 25, 50, 100], // Options for rows per page
          searching: true, // Enable search functionality
          ordering: true, // Enable column sorting
          info: true, // Show table info
          dom: 'Bfrtip', // Add buttons for export
          buttons: ['copy', 'excel', 'csv', 'pdf'] // Enable export buttons
        });
      }
    }
  },
  mounted() {
    this.fetchDisbursements();
  },
  watch: {
    disbursements() {
      this.$nextTick(() => {
        this.initializeDataTable();
      });
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table-responsive {
  margin-top: 20px;
}

.table-striped {
  background-color: #f8f8f8;
}

.table-bordered {
  border: 1px solid #ddd;
}

button {
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}
</style>

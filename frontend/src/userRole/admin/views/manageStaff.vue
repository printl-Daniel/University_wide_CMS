<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <AdminNavbar />

    <!-- Main Content -->
    <div class="container mt-4">
      <h2 class="mb-4">Add Staff</h2>

      <!-- Add Staff Form -->
      <form @submit.prevent="createStaff" class="mb-4">
        <!-- First Name Field -->
        <div class="form-group mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="newStaff.firstName"
            placeholder="Enter first name"
            required
            class="form-control"
          />
        </div>

        <!-- Last Name Field -->
        <div class="form-group mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="newStaff.lastName"
            placeholder="Enter last name"
            required
            class="form-control"
          />
        </div>

        <!-- Role Field -->
        <div class="form-group mb-3">
          <label for="role" class="form-label">Role</label>
          <input
            type="text"
            id="role"
            v-model="newStaff.role"
            placeholder="Enter role"
            required
            class="form-control"
          />
        </div>

        <!-- Contact Info Field -->
        <div class="form-group mb-3">
          <label for="contactInfo" class="form-label">Contact Info</label>
          <input
            type="text"
            id="contactInfo"
            v-model="newStaff.contactInfo"
            placeholder="Enter contact info"
            required
            class="form-control"
          />
        </div>

        <!-- Email Field -->
        <div class="form-group mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="newStaff.email"
            placeholder="Enter email"
            required
            class="form-control"
          />
        </div>

        <!-- Username Field -->
        <div class="form-group mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            id="username"
            v-model="newStaff.username"
            placeholder="Enter username"
            required
            class="form-control"
          />
        </div>

        <!-- Password Field -->
        <div class="form-group mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="newStaff.password"
            placeholder="Enter password"
            required
            class="form-control"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          <span v-if="loading">Adding...</span>
          <span v-else>Add Staff</span>
        </button>
      </form>

      <!-- Show Error Message -->
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <!-- Staff List -->
      <h3 class="mt-5">Staff List</h3>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="staff in staffList" :key="staff.staffId">
              <td>{{ staff.firstName }} {{ staff.lastName }}</td>
              <td>{{ staff.role }}</td>
              <td>{{ staff.email }}</td>
              <td>{{ staff.contactInfo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "../components/adminNavbar.vue";
import axios from "axios";

export default {
  components: {
    AdminNavbar,
  },
  data() {
    return {
      newStaff: {
        firstName: '',
        lastName: '',
        contactInfo: '',
        email: '',
        username: '',
        password: '',
        role: 'staff',
      },
      staffList: [],
      loading: false,
      errorMessage: null,
    };
  },
  methods: {
    async createStaff() {
      this.loading = true;
      this.errorMessage = null;

      try {
        await axios.post('http://localhost:5000/api/staff', this.newStaff);
        this.newStaff = { firstName: '', lastName: '', contactInfo: '', email: '', username: '', password: '', role: 'staff' };
        this.getUsers(); // Fetch the updated staff list
      } catch (error) {
        console.error('Error adding staff:', error);
        this.errorMessage = 'Failed to add staff. Please try again later.';
      } finally {
        this.loading = false;
      }
    },

    // Fetch users/staff list
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/staff');
        this.staffList = response.data; // Assuming the API returns the staff list
      } catch (error) {
        console.error('Error fetching staff:', error);
        this.errorMessage = 'Failed to fetch staff list. Please try again later.';
      }
    },
  },
  mounted() {
    this.getUsers(); // Fetch staff list on mount
  },
};
</script>

<style scoped>
/* Container styling */
.container {
  max-width: 1000px; /* Ensure the container is centered with enough width */
  padding: 20px;
}

/* Form styling */
.form-group {
  margin-bottom: 1.5rem;
}

/* Table styling for responsive tables */
.table-responsive {
  margin-top: 20px;
  overflow-x: auto;
}

.table th, .table td {
  padding: 12px;
}

.table-bordered {
  border: 1px solid #ddd;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

/* Submit button styling */
button.btn {
  width: 100%; /* Button spans full width */
}

/* Error message styling */
.alert {
  margin-top: 20px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  /* Adjust button and table for smaller screens */
  .btn {
    width: auto;
  }

  .table-responsive {
    margin-top: 10px;
  }
}
</style>

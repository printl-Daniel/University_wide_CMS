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
        <div class="user-management container mt-1">
          <!-- Page Title -->
          <h2 class="text-center mb-4">User Management</h2>

          <!-- Form Section -->
          <div class="user-form-section mb-5 p-4 bg-light rounded shadow-sm border">
            <!-- Form Title -->
            <h4 class="mb-3">Add or Manage User</h4>
            <form @submit.prevent="createUser" class="d-flex flex-wrap gap-3">
              <div class="flex-grow-1">
                <label for="fullName" class="form-label">Full Name</label>
                <input
                  v-model="newUser.fullname"
                  type="text"
                  id="fullName"
                  class="form-control"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div class="flex-grow-1">
                <label for="userName" class="form-label">Username</label>
                <input
                  v-model="newUser.username"
                  type="text"
                  id="userName"
                  class="form-control"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div class="flex-grow-1">
                <label for="userPassword" class="form-label">Password</label>
                <input
                  v-model="newUser.password"
                  type="password"
                  id="userPassword"
                  class="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div class="flex-grow-1">
                <label for="userRole" class="form-label">Role</label>
                <select v-model="newUser.role" id="userRole" class="form-select" required>
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <!-- First-time Login Checkbox -->
              <div class="flex-grow-1">
                <label for="firstTimeLogin" class="form-label">First-Time Login</label>
                <input
                  v-model="newUser.isFirstLogin"
                  type="checkbox"
                  id="firstTimeLogin"
                  class="form-check-input"
                  disabled
                />
                <small class="form-text text-muted">User will be required to reset password on first login.</small>
              </div>

              <div class="text-end w-100">
                <button type="submit" class="comic-button mt-3">Save User</button>
              </div>
            </form>
          </div>

          <!-- DataTable Section -->
          <div class="user-table-section p-4 bg-light rounded shadow-sm border">
            <h4 class="mb-3">User List</h4>
            <div class="table-responsive">
              <table id="userTable" class="table table-bordered table-striped">
                <thead class="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Dynamic User Rows (Fetched from Backend) -->
                  <tr v-for="user in users" :key="user._id">
                    <td>{{ user._id }}</td>
                    <td>{{ user.fullname }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                      <button class="btn btn-warning btn-sm" @click="editUser(user)">Edit</button>
                      <button class="btn btn-danger btn-sm" @click="deleteUser(user._id)">Delete</button>
                    </td>
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
import topNav from "../components/topNav.vue";
import sideNav from "../components/sideNav.vue";
import axios from "axios";

export default {
  components: {
    topNav,
    sideNav,
  },
  data() {
    return {
      newUser: {
        fullname: '',
        username: '',
        email: '',
        password: '',
        role: 'Staff',
        isFirstLogin: true, 
      },
      users: [],  // Will hold the list of users fetched from the backend
    };
  },
  methods: {
    async createUser() {
      try {
        // Send user data to backend for creation
        const response = await axios.post('http://localhost:5000/api/user/add-user', this.newUser);
        this.users.push(response.data);  // Add newly created user to the list
        this.resetForm();  // Reset form fields
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },

    // Method to fetch users from the backend
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    // Method to delete a user
    async deleteUser(userId) {
      try {
        await axios.delete(`/api/users/${userId}`);
        this.users = this.users.filter(user => user._id !== userId);  // Remove the deleted user from the list
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },

    // Method to edit a user
    editUser(user) {
      // Populate form with user details for editing
      this.newUser = { ...user };
    },

    // Reset form after adding a new user
    resetForm() {
      this.newUser = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        role: 'Staff',
        isFirstLogin: true,  // Default is first-time login
      };
    },
  },
  mounted() {
    this.fetchUsers();  // Fetch users when the component is mounted

    // Initialize DataTable
    $("#userTable").DataTable({
      responsive: true,
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
    });
  },
};
</script>

<style scoped>
.user-management {
  background-color: #f9f9f9;
}

.user-form-section,
.user-table-section {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.user-form-section h4,
.user-table-section h4 {
  color: #333;
}

.table thead {
  background-color: #f0f0f0;
}

/* Comic Button Style */
.comic-button {
  display: inline-block;
  padding: 6px 12px; /* Smaller button size */
  font-size: 18px; /* Reduced font size */
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #4caf50; /* Light green background */
  border: 2px solid #000;
  border-radius: 8px; /* Slightly smaller border radius */
  box-shadow: 3px 3px 0px #000; /* Reduced shadow */
  transition: all 0.3s ease;
  cursor: pointer;
}


.comic-button:hover {
  background-color: #fff;
  color: #000000;
  border: 2px solid #13c42a;
  box-shadow: 5px 5px 0px #ffffff;
}

.comic-button:active {
  background-color: #fcf414;
  box-shadow: none;
  transform: translateY(4px);
}

.btn {
  margin: 0 5px;
}
</style>

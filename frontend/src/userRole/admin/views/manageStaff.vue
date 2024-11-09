<template>
    <div class="d-flex">
      <adminSidebar />
      <div class="container">
        <h2>Add Staff</h2>
  
        <!-- Add Staff Form -->
        <form @submit.prevent="createStaff" class="mb-4">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              v-model="newStaff.firstName"
              placeholder="Enter first name"
              required
              class="form-control"
            />
          </div>
  
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              v-model="newStaff.lastName"
              placeholder="Enter last name"
              required
              class="form-control"
            />
          </div>
  
          <div class="form-group">
            <label for="role">Role</label>
            <input
              type="text"
              id="role"
              v-model="newStaff.role"
              placeholder="Enter role"
              required
              class="form-control"
            />
          </div>
  
          <div class="form-group">
            <label for="contactInfo">Contact Info</label>
            <input
              type="text"
              id="contactInfo"
              v-model="newStaff.contactInfo"
              placeholder="Enter contact info"
              required
              class="form-control"
            />
          </div>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="newStaff.email"
              placeholder="Enter email"
              required
              class="form-control"
            />
          </div>
  
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="newStaff.username"
              placeholder="Enter username"
              required
              class="form-control"
            />
          </div>
  
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="newStaff.password"
              placeholder="Enter password"
              required
              class="form-control"
            />
          </div>
  
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
  
        <h3>Staff List</h3>
        <table class="table table-bordered">
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
  </template>
  
  <script>
  import adminSidebar from '../components/admin-sideBar.vue';
  import axios from 'axios';
  
  export default {
    components: {
      adminSidebar,
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
  
      // Add getUsers method
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
      this.getUsers(); // Ensure this method exists
    },
  };
  </script>
  
  <style scoped>
  /* Your existing styles */
  </style>
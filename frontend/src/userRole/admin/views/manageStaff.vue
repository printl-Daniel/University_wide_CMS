<template>
    <div class="d-flex">
      <adminSidebar />
  
      <div class="staff-management-container">
        <h2>Manage Staff</h2>
  
        <!-- Button to Trigger Modal -->
        <button @click="showModal = true">Add Staff</button>
  
        <!-- Staff List -->
        <h3>Staff List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Info</th>
              <th>Username</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="staff in staffList" :key="staff.staffId">
              <td>{{ staff.firstName }} {{ staff.lastName }}</td>
              <td>{{ staff.email }}</td>
              <td>{{ staff.contactInfo }}</td>
              <td>{{ staff.username }}</td>
              <td>{{ new Date(staff.createdAt).toLocaleString() }}</td>
              <td>{{ new Date(staff.updatedAt).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
  
        <!-- Modal for Adding Staff -->
        <div v-if="showModal" class="modal-overlay">
          <div class="modal-content">
            <h3>Add Staff</h3>
            <form @submit.prevent="addStaff">
              <div>
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" v-model="newStaff.firstName" required />
              </div>
              <div>
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" v-model="newStaff.lastName" required />
              </div>
              <div>
                <label for="contactInfo">Contact Info</label>
                <input type="text" id="contactInfo" v-model="newStaff.contactInfo" required />
              </div>
              <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="newStaff.email" required />
              </div>
              <div>
                <label for="username">Username</label>
                <input type="text" id="username" v-model="newStaff.username" required />
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="newStaff.password" required />
              </div>
              <button type="submit">Add Staff</button>
              <button type="button" @click="showModal = false">Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import adminSidebar from '../components/admin-sideBar.vue';
  import axios from 'axios';
  
  export default {
    components: {
      adminSidebar
    },
    data() {
      return {
        newStaff: {
          firstName: '',
          lastName: '',
          contactInfo: '',
          email: '',
          username: '',
          password: '' // Plain password to be hashed on the server
        },
        staffList: [],
        showModal: false
      };
    },
    methods: {
      // Add a new staff member
      addStaff() {
        axios.post('/api/add-staff', this.newStaff)
          .then(response => {
            console.log(response.data.message);
            this.newStaff = { firstName: '', lastName: '', contactInfo: '', email: '', username: '', password: '' };
            this.showModal = false;
            this.fetchStaffList();
          })
          .catch(error => {
            console.error("There was an error adding the staff:", error);
          });
      },
      // Fetch the staff list from the backend
      fetchStaffList() {
        axios.get('/api/staff')
          .then(response => {
            this.staffList = response.data.staff;
          })
          .catch(error => {
            console.error("There was an error fetching the staff list:", error);
          });
      }
    },
    mounted() {
      this.fetchStaffList();
    }
  };
  </script>
  
  <style scoped>
  /* Basic styling for modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }
  </style>
  
<template>
    <div class="sidebar">
      <ul class="nav flex-column p-3">
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/manage-staff">Manage Staff</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/manage-doctors">Manage Doctors</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/manage-patients">Manage Patients</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/appointments">Manage Appointments</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/feedback">Feedback & Evaluation</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/reports">Reports</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/settings">Settings</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background-color: #d4edda; /* Light green background */
    height: 100vh; /* Full height */
    border-right: 2px solid #ccc; /* Optional: Border for better visibility */
  }
  
  .nav-link {
    color: #333;
    font-weight: 500;
  }
  
  .nav-link:hover {
    color: #007bff; /* Highlight color on hover */
    background-color: #c3e6cb; /* Subtle hover background */
  }
  
  .nav-item {
    margin-bottom: 15px; /* Add spacing between menu items */
  }
  </style>
  
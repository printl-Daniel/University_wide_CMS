<template>
    <div class="sidebar">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <h3>Clinic</h3>
      </div>
  
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
  export default {  name: "Sidebar",
  // Import CSS file from public folder
  mounted() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/sidebar.css'; 
    document.head.appendChild(link);
  },
};
  </script>
  
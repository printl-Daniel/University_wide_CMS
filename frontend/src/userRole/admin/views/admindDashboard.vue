<template>
    <div class="d-flex">
      <!-- Sidebar -->
      <adminSidebar />
  
      <!-- Dashboard Content -->
      <div class="dashboard container mt-4">
        <h2>Dashboard</h2>
        <div class="row g-4 mt-3">
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Appointments</h3>
                <p class="card-text">20 Scheduled</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Doctors</h3>
                <p class="card-text">10 Active</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Patients</h3>
                <p class="card-text">150 Registered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import adminSidebar from '../components/admin-sideBar.vue'
  export default {
    components: {
        adminSidebar
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    flex: 1;
  }
  </style>
<template>
    <div class="dashboard">
      <StaffSidebar />
      <div class="content">
        <h2>Staff Dashboard</h2>
        <p>Welcome, Staff! Manage inventory and reports here.</p>
      </div>
    </div>
  </template>
  
  <script>
 import StaffSidebar from "../components/staff_sideBar.vue";
  
 export default {
  components: {
    StaffSidebar, 
  },
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
  }
  .content {
    padding: 20px;
    flex-grow: 1;
  }
  </style>
  
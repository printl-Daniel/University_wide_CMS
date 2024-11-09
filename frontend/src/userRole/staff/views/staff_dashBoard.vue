<template>
  <StaffSidebar />
  <div class="dashboard">
    
    <staffHeader /> <!-- Header sa itaas -->
    <div class="main-content">
      <!-- Sidebar sa kaliwa -->
      <div class="content"> <!-- Dashboard content sa kanan -->
        <h2>Staff Dashboard</h2>
        <p>Welcome, Staff! Manage inventory and reports here.</p>
      </div>
    </div>
  </div>s
</template>a

<script>
import StaffSidebar from "../components/staff_sideBar.vue";
import staffHeader from "../components/staff_header.vue";

export default {
  components: {
    StaffSidebar,
    staffHeader,
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh; 
}

.main-content {

  flex-grow: 1; 
}

.sidebar {
  width: 250px; 
}

.content {
  flex-grow: 1; 
  padding: 20px;
}
</style>

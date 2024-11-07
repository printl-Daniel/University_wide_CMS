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
</template>

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
  height: 100vh; /* Buong taas ng screen */
}

.main-content {

  flex-grow: 1; /* Para sa natitirang taas sa ilalim ng header */
}

.sidebar {
  width: 250px; /* Fixed width para sa sidebar */
}

.content {
  flex-grow: 1; /* Sakupin ang natitirang espasyo sa kanan */
  padding: 20px;
}
</style>

<template>
  <div>
    <!-- Top Navbar (TopNav) -->
    <div class="header">
      <topNav />
    </div>
    
    <!-- Page Content -->
    <div class="page-content d-flex">
      <!-- Sidebar (SideNav) -->
      <sideNav />
      
      <!-- Main Content Area -->
      <div class="content flex-grow-1">
        <h2>Doctor Dashboard</h2>
        <p>
          Welcome, Doctor! Manage your tasks and view patient information here.
        </p>
        <!-- Additional dashboard content can go here -->
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "../components/topNav.vue";
import sideNav from "../components/sideNav.vue";

export default {
  components: {
    topNav,
    sideNav,
  },
};
</script>

<style scoped>

</style>

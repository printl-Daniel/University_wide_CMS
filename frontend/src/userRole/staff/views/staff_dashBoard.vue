<template>
      <div>
        <navBar />
      </div>
  <div class="container-fluid">
    <!-- Sidebar Component -->


    <!-- Dashboard Content -->
    <div class="dashboard">

      <div class="main-content">
        <div class="content">
          <h2>Staff Dashboard</h2>
          <p>Welcome, Staff! Manage inventory and reports here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/staff_navbar.vue";


export default {
  components: {
    navBar,
  },
};
</script>

<style scoped>


/* Sidebar should have a fixed width */
</style>

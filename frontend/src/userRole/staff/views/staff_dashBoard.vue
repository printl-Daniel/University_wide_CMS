<template>
  <div class="d-flex">
    <!-- Sidebar Component -->
    <StaffSidebar />

    <!-- Dashboard Content -->
    <div class="dashboard">
      <staffHeader />
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
/* Flex container for sidebar and content */
.d-flex {
  display: flex;
  height: 100vh; /* Make sure the content takes full height */
}

/* Sidebar should have a fixed width */
.staffSidebar {
  width: 250px; /* You can adjust this width as needed */
  background-color: #f4f4f4;
  /* Add padding, border, or other styles if needed */
}

/* Dashboard content should take the remaining space */
.dashboard {
  flex-grow: 1;
  padding: 20px;
}

/* Main content style */
.main-content {
  margin-top: 20px;
}

/* Optional: Styling for content */
.content {
  margin-top: 20px;
}
</style>

<template>
  <div>
    <DoctorNavbar />
    <div class="dashboard">
      <div class="content">
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
import DoctorNavbar from "../components/doctorNavbar.vue";

export default {
  components: {
    DoctorNavbar,
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
  background-color: #fff;
}
</style>

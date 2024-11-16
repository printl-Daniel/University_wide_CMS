<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div>
      <AdminNavbar />
    </div>

    <!-- Dashboard Content -->
    <div class="main-container">
     
      <div class="container">
        <h2>Dashboard</h2>
        <div class="row g-4 mt-3">
        <!-- Example of cards inside the dashboard -->
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
  </div>
</template>

<script>
import AdminNavbar from '../components/adminNavbar.vue'

export default {
  components: {
    AdminNavbar
  }
}
</script>

<style scoped>


</style>

<template>
  <div>
    <!-- Admin Navbar (Top Navbar) -->
    <div class="header">
      <topNav />
    </div>

    <!-- Page Content (Main Content with Sidebar) -->
    <div class="page-content d-flex">
      <!-- Sidebar -->
      <div class="sidebar">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="content flex-grow-1">
        <!-- User Management Content -->
        <div class="user-management container mt-5">
          <!-- Page Title -->
          <h2 class="text-center mb-4">User Management</h2>

          <!-- Add New User Button -->
          <div class="text-end mb-3">
            <button class="btn btn-success">Add New User</button>
          </div>

          <!-- User List Table -->
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Mock User Data -->
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>johndoe@example.com</td>
                  <td>Admin</td>
                  <td>
                    <button class="btn btn-warning btn-sm">Edit</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>janesmith@example.com</td>
                  <td>Doctor</td>
                  <td>
                    <button class="btn btn-warning btn-sm">Edit</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Robert Brown</td>
                  <td>robertbrown@example.com</td>
                  <td>Staff</td>
                  <td>
                    <button class="btn btn-warning btn-sm">Edit</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav aria-label="User Pagination" class="mt-4">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from '../components/topNav.vue'
import sideNav from '../components/sideNav.vue'

export default {
  components: {
    topNav,
    sideNav
  }
}
</script>

<style scoped>
/* You can add any specific styles for the user management page here */
.user-management {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.user-management h2 {
  color: #333;
}

.table thead {
  background-color: #f0f0f0;
}

.btn {
  margin: 0 5px;
}
</style>

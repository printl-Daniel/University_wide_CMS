<template>
      <div>
        <AdminNavbar />
      </div>
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

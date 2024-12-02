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
        <div class="user-management container mt-1">
          <!-- Page Title -->
          <h2 class="text-center mb-4">User Management</h2>

          <!-- Form Section -->
          <div class="user-form-section mb-5 p-4 bg-light rounded shadow-sm border">
            <!-- Form Title -->
            <h4 class="mb-3">Add or Manage User</h4>
            <form class="d-flex flex-wrap gap-3">
              <div class="flex-grow-1">
                <label for="fullName" class="form-label">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  class="form-control"
                  placeholder="Enter full name"
                />
              </div>
              <div class="flex-grow-1">
                <label for="userName" class="form-label">Username</label>
                <input
                  type="text"
                  id="userName"
                  class="form-control"
                  placeholder="Enter username"
                />
              </div>
              <div class="flex-grow-1">
                <label for="userEmail" class="form-label">Email</label>
                <input
                  type="email"
                  id="userEmail"
                  class="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div class="flex-grow-1">
                <label for="userPassword" class="form-label">Password</label>
                <input
                  type="password"
                  id="userPassword"
                  class="form-control"
                  placeholder="Enter password"
                />
              </div>
              <div class="flex-grow-1">
                <label for="userRole" class="form-label">Role</label>
                <select id="userRole" class="form-select">
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div class="text-end w-100">
                <button type="submit" class="comic-button mt-3">Save User</button>
              </div>
            </form>
          </div>

          <!-- DataTable Section -->
          <div class="user-table-section p-4 bg-light rounded shadow-sm border">
            <h4 class="mb-3">User List</h4>
            <div class="table-responsive">
              <table id="userTable" class="table table-bordered table-striped">
                <thead class="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>johndoe</td>
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
                    <td>janesmith</td>
                    <td>janesmith@example.com</td>
                    <td>Doctor</td>
                    <td>
                      <button class="btn btn-warning btn-sm">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                      <button class="btn btn-danger btn-sm">
                        <i class="fa-solid fa-trash-can"></i> Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Robert Brown</td>
                    <td>robertb</td>
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
          </div>
        </div>
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
  mounted() {
    // Initialize DataTable
    $("#userTable").DataTable({
      responsive: true,
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
    });
  },
};
</script>

<style scoped>
.user-management {
  background-color: #f9f9f9;
}

.user-form-section,
.user-table-section {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.user-form-section h4,
.user-table-section h4 {
  color: #333;
}

.table thead {
  background-color: #f0f0f0;
}

/* Comic Button Style */
.comic-button {
  display: inline-block;
  padding: 6px 12px; /* Smaller button size */
  font-size: 18px; /* Reduced font size */
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #4caf50; /* Light green background */
  border: 2px solid #000;
  border-radius: 8px; /* Slightly smaller border radius */
  box-shadow: 3px 3px 0px #000; /* Reduced shadow */
  transition: all 0.3s ease;
  cursor: pointer;
}


.comic-button:hover {
  background-color: #fff;
  color: #000000;
  border: 2px solid #13c42a;
  box-shadow: 5px 5px 0px #ffffff;
}

.comic-button:active {
  background-color: #fcf414;
  box-shadow: none;
  transform: translateY(4px);
}

.btn {
  margin: 0 5px;
}
</style>

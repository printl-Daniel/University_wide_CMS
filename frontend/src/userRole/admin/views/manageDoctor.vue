<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <AdminNavbar />

    <!-- Main Content -->
    <div class="container mt-4">
      <h2 class="mb-4">Manage Doctors</h2>
      <div class="card">
        <div class="card-header">
          <button class="btn btn-primary" @click="addDoctor">Add Doctor</button>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(doctor, index) in doctors" :key="doctor.id">
                <td>{{ index + 1 }}</td>
                <td>{{ doctor.name }}</td>
                <td>{{ doctor.email }}</td>
                <td>{{ doctor.phone }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="editDoctor(doctor.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger btn-sm ms-2"
                    @click="deleteDoctor(doctor.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "../components/adminNavbar.vue";

export default {
  components: {
    AdminNavbar,
  },
  data() {
    return {
      doctors: [
        {
          id: 1,
          name: "Dr. Alice Johnson",
          email: "alice@example.com",
          phone: "123-456-7890",
        },
        {
          id: 2,
          name: "Dr. Bob Smith",
          email: "bob@example.com",
          phone: "098-765-4321",
        },
        // Add more doctor data as needed
      ],
    };
  },
  methods: {
    addDoctor() {
      // Logic to add a doctor
    },
    editDoctor(id) {
      // Logic to edit a doctor
    },
    deleteDoctor(id) {
      // Logic to delete a doctor
      this.doctors = this.doctors.filter((doctor) => doctor.id !== id);
    },
  },
};
</script>

<style scoped>
/* Container for content */
.container {
  max-width: 1200px; /* Max width for larger screens */
  margin: 0 auto; /* Center the content */
  padding-left: 15px;
  padding-right: 15px;
}

/* Card styling */
.card {
  border: none; /* Remove card border */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Add light shadow for card */
}

/* Table styling */
.table {
  margin-top: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px; /* Increased padding for readability */
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #f9f9f9; /* Slightly darker background for odd rows */
}

/* Button styling */
button.btn {
  border-radius: 5px; /* Round buttons slightly */
}

/* Add some space between buttons */
button.btn.ms-2 {
  margin-left: 10px;
}

@media (max-width: 768px) {
  /* Mobile responsiveness: Adjust content for smaller screens */
  .container {
    max-width: 100%; /* Make the container full width */
    padding-left: 10px;
    padding-right: 10px;
  }

  .table th,
  .table td {
    padding: 8px; /* Smaller padding on mobile screens */
  }

  .btn {
    font-size: 0.8rem; /* Smaller font size for buttons on mobile */
  }
}
</style>

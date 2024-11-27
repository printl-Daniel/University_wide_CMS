<template>
  <div>
    <!-- Admin Navbar (Top Navbar) -->
    <div class="header">
      <topNav />
    </div>
    
    <div class="page-content d-flex">
      <!-- Sidebar -->
      <sideNav />

      <!-- Main Content (flex-grow-1) -->
      <div class="content flex-grow-1">
        <!-- CSV Upload Section -->
        <div class="card">
          <div class="card-header">
            <h2>Import Students from CSV</h2>
          </div>
          <div class="card-body">
            <!-- File input to upload CSV -->
            <input
              type="file"
              accept=".csv"
              @change="handleFileUpload"
              class="file-input"
            />
          </div>
        </div>

        <!-- Students Table Section -->
        <div class="card mt-4">
          <div class="card-header">
            <h2>Enrolled Students</h2>
          </div>
          <div class="card-body">
            <!-- Students Table -->
            <table id="studentsTable" class="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.id">
                  <td>{{ student.firstName }}</td>
                  <td>{{ student.lastName }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.course }}</td>
                  <td>
                    <button @click="editStudent(student)" class="btn btn-primary btn-sm">
                      Edit
                    </button>
                    <button @click="deleteStudent(student.id)" class="btn btn-danger btn-sm">
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
  </div>
</template>

<script>
// Import Sidebar and Top Navbar components
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';

export default {
  components: {
    sideNav,
    topNav
  },
  data() {
    return {
      students: [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', course: 'Course A' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', course: 'Course B' },
        { id: 3, firstName: 'Emily', lastName: 'Davis', email: 'emily@example.com', course: 'Course C' },
        // More students can be added here
      ]
    };
  },
  mounted() {
    // Initialize DataTables once the component has been mounted
    this.initializeDataTable();
  },
  methods: {
    initializeDataTable() {

      $(document).ready(function() {
        $('#studentsTable').DataTable();
      });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        console.log(file);
      }
    },
    editStudent(student) {
      // Implement edit logic here
      console.log('Edit student:', student);
    },
    deleteStudent(studentId) {
      // Implement delete logic here
      this.students = this.students.filter(student => student.id !== studentId);
      console.log('Deleted student with ID:', studentId);
    }
  }
};
</script>

<style scoped>
/* Main content styling */
.content {
  flex-grow: 1;
  padding: 20px;
}

/* Card styling */
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

.card-header {
  background-color: #f5f5f5;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 15px;
}

h2 {
  margin: 0;
}

/* Table styling */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f5f5f5;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}

/* File input styling */
.file-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>

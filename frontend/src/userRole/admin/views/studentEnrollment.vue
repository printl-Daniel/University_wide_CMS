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

        <!-- Filter Section -->
        <div class="card mt-4">

          </div>
          <div class="card-body">
            <!-- College Filter -->
            <label for="collegeFilter">College:</label>
            <select v-model="filters.college" @change="fetchStudents" id="collegeFilter">
              <option value="">All Colleges</option>
              <option v-for="college in colleges" :key="college" :value="college">{{ college }}</option>
            </select>

            <!-- Year and Section Filter -->
            <label for="yearAndSectionFilter">Year & Section:</label>
            <select v-model="filters.yearAndSection" @change="fetchStudents" id="yearAndSectionFilter">
              <option value="">All Sections</option>
              <option v-for="yearAndSection in yearAndSections" :key="yearAndSection" :value="yearAndSection">
                {{ yearAndSection }}
              </option>
            </select>
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
                  <th>College</th>
                  <th>Program</th>
                  <th>Year & Section</th>
                  <th>Major</th>
                  <th>Student No.</th>
                  <th>Full Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student._id">
                  <td>{{ student.college }}</td>
                  <td>{{ student.program }}</td>
                  <td>{{ student.yearAndSection }}</td>
                  <td>{{ student.major }}</td>
                  <td>{{ student.studentNo }}</td>
                  <td>{{ student.fullname }}</td>
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
import sideNav from '../components/sideNav.vue';
import topNav from '../components/topNav.vue';
import axios from 'axios';

export default {
  components: {
    sideNav,
    topNav
  },
  data() {
    return {
      students: [],
      colleges: [], // To store distinct colleges
      yearAndSections: [], // To store distinct Year & Sections
      filters: {
        college: '',
        yearAndSection: ''
      }
    };
  },
  mounted() {
    this.fetchColleges(); // Fetch college list on component mount
    this.fetchYearAndSections(); // Fetch Year & Section list
    this.fetchStudents(); // Fetch student data
  },
  methods: {
    // Fetch distinct colleges from the backend
    async fetchColleges() {
      try {
        const response = await axios.get('http://localhost:5000/api/student-enrollment/colleges');
        this.colleges = response.data; // Set the colleges list
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    },

    // Fetch distinct Year & Section values from the backend
    async fetchYearAndSections() {
      try {
        const response = await axios.get('http://localhost:5000/api/student-enrollment/year-and-sections');
        this.yearAndSections = response.data; // Set the Year and Sections list
      } catch (error) {
        console.error('Error fetching year and sections:', error);
      }
    },

    // Fetch students based on filters
    async fetchStudents() {
      try {
        const response = await axios.get('http://localhost:5000/api/student-enrollment/students', {
          params: {
            college: this.filters.college,
            yearAndSection: this.filters.yearAndSection
          }
        });
        this.students = response.data;
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('csvFile', file);

        try {
          const response = await axios.post('http://localhost:5000/api/student-enrollment/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          alert(response.data.message);
          this.fetchStudents();  
        } catch (error) {
          console.error('Error uploading CSV file:', error);
          alert('Error uploading CSV file');
        }
      }
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

/* File input styling */
.file-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Upload button styling */
button {
  padding: 8px 15px;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}

/* Upload message styling */
.text-success {
  color: green;
  font-weight: bold;
}

.text-danger {
  color: red;
  font-weight: bold;
}
</style>

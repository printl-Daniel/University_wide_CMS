<template>
  <div class="main-container">
    <!-- Admin Navbar (Top Navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content d-flex">
      <!-- Sidebar -->
      <sideNav />

      <!-- Main Content -->
      <div class="content flex-grow-1">
        <!-- CSV Upload Section -->
        <div class="card full-width">
          <div class="card-header">
            <h4>Import Students from CSV</h4>
          </div>
          <div class="card-body">
            <input
              type="file"
              accept=".csv"
              @change="handleFileUpload"
              class="file-input"
            />
          </div>
        </div>

        <!-- Filter Section -->
        <div class="card full-width">
          <div class="card-header">
            <h5>Filter Students</h5>
          </div>
          <div class="card-body d-flex gap-3 flex-wrap">
            <div class="filter-group">
              <label for="collegeFilter">College:</label>
              <select
                v-model="filters.college"
                @change="fetchStudents"
                id="collegeFilter"
                class="form-control"
              >
                <option value="">All Colleges</option>
                <option
                  v-for="college in colleges"
                  :key="college"
                  :value="college"
                >
                  {{ college }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label for="yearAndSectionFilter">Year & Section:</label>
              <select
                v-model="filters.yearAndSection"
                @change="fetchStudents"
                id="yearAndSectionFilter"
                class="form-control"
              >
                <option value="">All Sections</option>
                <option
                  v-for="yearAndSection in yearAndSections"
                  :key="yearAndSection"
                  :value="yearAndSection"
                >
                  {{ yearAndSection }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Students Table Section -->
        <div class="card full-width">
          <div class="card-header">
            <h5>Enrolled Students</h5>
          </div>
          <div class="card-body">
            <table id="studentsTable" class="table table-striped table-hover">
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
.main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  display: flex;
  flex-grow: 1;
  overflow-x: hidden;
}

.content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Full width for cards */
.full-width {
  width: 100%;
}

.card {
  border: 1px solid #ddd;
  border-radius: 5px;
}

.card-header {
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 10px;
}

.file-input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  text-align: left;
  padding: 8px;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}
</style>

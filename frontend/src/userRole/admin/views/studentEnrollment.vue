<template>
  <div class="flex flex-col h-screen">
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <TopNav />
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar Navigation -->
      <div class="sidebar">
        <SideNav />
      </div>
      <div class="flex-1 overflow-y-auto bg-gray-100">
        <main class="p-6">
          <div class="max-w-7xl mx-auto">
            <!-- Combined CSV Upload and Filter Section -->
            <div class="bg-white shadow-md rounded-lg mb-6">
              <div class="px-6 py-4 border-b border-black-200">
                <h4 class="text-lg font-semibold text-black-800">Manage Students</h4>
              </div>
              <div class="p-6">
                <div class="mb-6">
                  <h5 class="text-md font-semibold text-gray-700 mb-2">Import Students from CSV</h5>
                  <input
                    type="file"
                    accept=".csv"
                    @change="handleFileUpload"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div>
                  <h5 class="text-md font-semibold text-gray-700 mb-2">Filter Students</h5>
                  <div class="flex flex-wrap gap-4">
                    <div class="w-full sm:w-auto flex-1">
                      <label for="collegeFilter" class="block text-sm font-medium text-gray-700 mb-1">College:</label>
                      <select
                        v-model="filters.college"
                        @change="fetchStudents"
                        id="collegeFilter"
                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                    <div class="w-full sm:w-auto flex-1">
                      <label for="yearAndSectionFilter" class="block text-sm font-medium text-gray-700 mb-1">Year & Section:</label>
                      <select
                        v-model="filters.yearAndSection"
                        @change="fetchStudents"
                        id="yearAndSectionFilter"
                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
              </div>
            </div>

            <!-- Students Table Section -->
            <div class="bg-white shadow-md rounded-lg">
              <div class="px-6 py-4 border-b border-gray-200">
                <h5 class="text-lg font-semibold text-gray-800">Enrolled Students</h5>
              </div>
              <div class="p-6">
                <div class="overflow-x-auto">
                  <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                      <div class="max-h-[calc(100vh-400px)] overflow-y-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-50 sticky top-0">
                            <tr>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year & Section</th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student No.</th>
                              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="student in students" :key="student._id" class="hover:bg-gray-50">
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.college }}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.program }}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.yearAndSection }}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.major }}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.studentNo }}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ student.fullname }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/sideNav.vue";
import TopNav from "../components/topNav.vue";
import axios from "axios";

export default {
  components: {
    SideNav,
    TopNav,
  },
  data() {
    return {
      students: [],
      colleges: [],
      yearAndSections: [],
      filters: {
        college: "",
        yearAndSection: "",
      },
    };
  },
  mounted() {
    this.fetchColleges();
    this.fetchYearAndSections();
    this.fetchStudents();
  },
  methods: {
    async fetchColleges() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/student-enrollment/colleges"
        );
        this.colleges = response.data;
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    },
    async fetchYearAndSections() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/student-enrollment/year-and-sections"
        );
        this.yearAndSections = response.data;
      } catch (error) {
        console.error("Error fetching year and sections:", error);
      }
    },
    async fetchStudents() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/student-enrollment/students",
          {
            params: {
              college: this.filters.college,
              yearAndSection: this.filters.yearAndSection,
            },
          }
        );
        this.students = response.data;
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("csvFile", file);

        try {
          const response = await axios.post(
            "http://localhost:5000/api/student-enrollment/upload",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          alert(response.data.message);
          this.fetchStudents();
        } catch (error) {
          console.error("Error uploading CSV file:", error);
          alert("Error uploading CSV file");
        }
      }
    },
  },
};
</script>
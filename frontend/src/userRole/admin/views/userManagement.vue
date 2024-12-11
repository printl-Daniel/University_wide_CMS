<template>
  <div class="min-h-screen">
    <!-- Admin Navbar (Top Navbar) -->
    <div class="bg-white shadow">
      <topNav />
    </div>

    <div class="flex">
      <!-- Sidebar Navigation -->
      <div class="w-64 min-h-screen">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 p-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">User Management</h2>

          <!-- User Form Section -->
          <div class="bg-white shadow-sm rounded-lg p-6 mb-8">
            <h4 class="text-xl font-semibold mb-4">Add or Manage User</h4>
            <form @submit.prevent="createUser" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    v-model="newUser.fullname"
                    type="text"
                    id="fullName"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label for="userName" class="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    v-model="newUser.username"
                    type="text"
                    id="userName"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div>
                  <label for="userPassword" class="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    v-model="newUser.password"
                    type="password"
                    id="userPassword"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div>
                  <label for="userRole" class="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    v-model="newUser.role"
                    id="userRole"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  >
                    <option value="Admin">Admin</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>
              <div class="text-right">
                <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save User
                </button>
              </div>
            </form>
          </div>

          <!-- User Table Section -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h4 class="text-xl font-semibold mb-4">User List</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in paginatedUsers" :key="user._id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.fullname }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.username }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <!-- <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-2"></button> -->
                      <button @click="deleteUser(user._id)" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Pagination -->
            <div class="mt-4 flex justify-between items-center">
              <div>
                <span class="text-sm text-gray-700">
                  Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} entries
                </span>
              </div>
              <div>
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded-md bg-gray-200 text-gray-700 mr-2 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Success Modal -->
        <SuccessModal
          :visible="showSuccessModal"
          :message="successMessage"
          @close="showSuccessModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import topNav from "../components/topNav.vue";
import sideNav from "../components/sideNav.vue";
import SuccessModal from "../../../components/sucessModal.vue";
import axios from "axios";

export default {
  components: {
    topNav,
    sideNav,
    SuccessModal,
  },
  setup() {
    const newUser = ref({
      fullname: '',
      username: '',
      email: '',
      password: '',
      role: 'Staff',
    });
    const users = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const totalItems = computed(() => users.value.length);
    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalItems.value));

    const paginatedUsers = computed(() => {
      return users.value.slice(startIndex.value, endIndex.value);
    });

    const showSuccessModal = ref(false);
    const successMessage = ref("");

    const createUser = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/user/add-user', newUser.value);
        users.value.push(response.data);
        successMessage.value = "User has been added successfully!";
        showSuccessModal.value = true;
        resetForm();
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/users');
        users.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const deleteUser = async (userId) => {
      // Confirmation dialog (optional)
      const confirmDeletion = confirm("Are you sure you want to delete this user?");
      if (!confirmDeletion) return; // Stop if the user cancels

      try {
        await axios.delete(`http://localhost:5000/api/user/delete-user/${userId}`);
        // Filter out the deleted user from the users list
        users.value = users.value.filter(user => user._id !== userId);
        successMessage.value = "User has been deleted successfully!";
        showSuccessModal.value = true;
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    // const editUser = (user) => {
    //   newUser.value = { ...user };
    // };

    const resetForm = () => {
      newUser.value = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        role: 'Staff',
      };
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    fetchUsers();

    return {
      newUser,
      users,
      createUser,
      deleteUser,
      // editUser,
      resetForm,
      paginatedUsers,
      currentPage,
      totalPages,
      totalItems,
      startIndex,
      endIndex,
      prevPage,
      nextPage,
      showSuccessModal,
      successMessage
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Top Navbar -->
    <div class="header">
      <topNav />
    </div>

    <div class="flex">
      <!-- Sidebar Navigation -->
      <div class="sidebar">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 p-8 overflow-hidden">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Disbursement History</h2>

          <!-- Search Section -->
          <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div class="flex flex-wrap gap-4 items-center">
              <div class="flex-grow">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search disbursements..."
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Disbursements Table Section -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      v-for="header in headers"
                      :key="header.key"
                      @click="sortBy(header.key)"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      {{ header.label }}
                      <span v-if="sortKey === header.key" class="ml-1">
                        {{ sortOrder === 'asc' ? '▲' : '▼' }}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="disbursement in paginatedData" :key="disbursement._id" class="hover:bg-gray-50">
                    <td
                      v-for="header in headers"
                      :key="header.key"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ formatCellData(disbursement[header.key], header.key) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ totalItems }}</span> results
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      @click="prevPage"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span class="sr-only">Previous</span>
                      <!-- Heroicon name: solid/chevron-left -->
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button
                      v-for="page in displayedPages"
                      :key="page"
                      @click="goToPage(page)"
                      :class="[
                        page === currentPage
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      ]"
                    >
                      {{ page }}
                    </button>
                    <button
                      @click="nextPage"
                      :disabled="currentPage === totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span class="sr-only">Next</span>
                      <!-- Heroicon name: solid/chevron-right -->
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import axios from 'axios'
import topNav from '../components/topNav.vue'
import sideNav from '../components/sideNav.vue'

export default {
  components: {
    topNav,
    sideNav,
  },
  setup() {
    const disbursements = ref([])
    const searchQuery = ref('')
    const sortKey = ref('date')
    const sortOrder = ref('desc')
    const currentPage = ref(1)
    const itemsPerPage = 10

    const headers = [
      { key: 'itemName', label: 'Item Name' },
      { key: 'quantity', label: 'Quantity' },
      { key: 'patientName', label: 'Patient Name' },
      { key: 'reason', label: 'Reason' },
      { key: 'college', label: 'College' },
      { key: 'date', label: 'Date' },
    ]

    const sortedAndFilteredData = computed(() => {
      let result = [...disbursements.value]
      
      if (searchQuery.value) {
        result = result.filter(item => 
          Object.values(item).some(val => 
            val.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
          )
        )
      }
      
      return result.sort((a, b) => {
        const aValue = a[sortKey.value]
        const bValue = b[sortKey.value]
        
        if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
        return 0
      })
    })

    const totalItems = computed(() => sortedAndFilteredData.value.length)
    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalItems.value))

    const paginatedData = computed(() => {
      return sortedAndFilteredData.value.slice(startIndex.value, endIndex.value)
    })

    const displayedPages = computed(() => {
      const range = 2 // Number of pages to show before and after the current page
      let start = Math.max(1, currentPage.value - range)
      let end = Math.min(totalPages.value, currentPage.value + range)

      if (start > 1) {
        start += 1
      }
      if (end < totalPages.value) {
        end -= 1
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    })

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortKey.value = key
        sortOrder.value = 'asc'
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const goToPage = (page) => {
      currentPage.value = page
    }

    const fetchDisbursements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/inventory/disbursements")
        disbursements.value = response.data
      } catch (error) {
        console.error("Error fetching disbursements:", error)
      }
    }

    const formatCellData = (value, key) => {
      if (key === 'date') {
        return new Date(value).toLocaleString()
      }
      return value
    }

    fetchDisbursements()

    return {
      disbursements,
      searchQuery,
      sortKey,
      sortOrder,
      headers,
      paginatedData,
      sortBy,
      formatCellData,
      currentPage,
      totalPages,
      totalItems,
      startIndex,
      endIndex,
      prevPage,
      nextPage,
      goToPage,
      displayedPages,
    }
  }
}
</script>


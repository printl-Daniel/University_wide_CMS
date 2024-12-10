<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content flex">
      <!-- Sidebar Navigation -->
      <div class="sidebar w-1/5 text-white">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="content flex-grow p-4">
        <div class="p-4">
          <div class="mb-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
            <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
              <thead>
                <tr class="text-left">
                  <th
                    v-for="header in headers"
                    :key="header.key"
                    class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs"
                    @click="sortBy(header.key)"
                  >
                    {{ header.label }}
                    <span v-if="sortKey === header.key">
                      {{ sortOrder === 'asc' ? '▲' : '▼' }}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(history, index) in paginatedData"
                  :key="history.transactionId"
                  :class="{ 'bg-gray-50': index % 2 === 0 }"
                  class="hover:bg-gray-100 transition-colors duration-200"
                >
                  <td v-for="header in headers" :key="header.key" class="border-t border-gray-200 px-6 py-4">
                    {{ header.key === 'transactionDate' ? formatDate(history[header.key]) : history[header.key] }}
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
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import axios from 'axios'
import sideNav from '../components/sideNav.vue'
import topNav from '../components/topNav.vue'

export default {
  components: {
    sideNav,
    topNav,
  },
  setup() {
    const transactionHistory = ref([])
    const searchQuery = ref('')
    const sortKey = ref('transactionDate')
    const sortOrder = ref('desc')
    const currentPage = ref(1)
    const itemsPerPage = 10

    const headers = [
      { key: 'transactionId', label: 'Transaction ID' },
      { key: 'transactionDate', label: 'Transaction Date' },
      { key: 'itemName', label: 'Item Name' },
      { key: 'actionType', label: 'Action Type' },
      { key: 'quantityChanged', label: 'Quantity' },
      { key: 'remainingQuantity', label: 'Current Quantity' },
      { key: 'responsiblePerson', label: 'Responsible Person' },
    ]

    const sortedAndFilteredData = computed(() => {
      let result = [...transactionHistory.value]
      
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

    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/inventory/history')
        if (res.data.success) {
          transactionHistory.value = res.data.data
        } else {
          console.error('Failed to fetch history:', res.data.message)
        }
      } catch (error) {
        console.error('Error fetching history:', error)
      }
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    fetchHistory()

    return {
      transactionHistory,
      searchQuery,
      sortKey,
      sortOrder,
      headers,
      paginatedData,
      sortBy,
      formatDate,
      currentPage,
      totalPages,
      totalItems,
      startIndex,
      endIndex,
      prevPage,
      nextPage,
    }
  }
}
</script>

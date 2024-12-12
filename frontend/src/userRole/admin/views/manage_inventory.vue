<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Top Navbar -->
    <div class="header font-sans">
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
          <h2 class="text-3xl font-bold text-black-900 mb-6">Inventory Items</h2>

          <!-- Search Section -->
          <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div class="flex flex-wrap gap-4 items-center">
              <div class="flex-grow">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search inventory items..."
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Inventory Items Table Section -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      v-for="header in headers"
                      :key="header.key"
                      @click="sortBy(header.key)"
                      class="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      {{ header.label }}
                      <span v-if="sortKey === header.key" class="ml-1">
                        {{ sortOrder === 'asc' ? '▲' : '▼' }}
                      </span>
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in paginatedData" :key="item._id" class="hover:bg-gray-50">
                    <td
                      v-for="header in headers"
                      :key="header.key"
                      class="px-4 py-1 whitespace-nowrap text-sm text-black-500"
                    >
                      {{ formatCellData(item[header.key], header.key) }}
                    </td>
                    <td class="px-6 py-1 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-2">
                        <button @click="openAddQuantityModal(item)" class="text-blue-600 hover:text-blue-900">
                          <CirclePlus class="h-5 w-5" />
                        </button>
                        <button @click="openDisburseModal(item)" class="text-red-600 hover:text-red-900">
                          <CircleMinus class="h-5 w-5" />
                        </button>
                        <a :href="`/admin/edit-item/${item._id}`" class="text-green-600 hover:text-green-900">
                          <PencilLine class="h-5 w-5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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

    <!-- Modals -->
    <addQuantityModal
      v-if="showAddQuantityModal"
      :selectedItem="selectedItemForQuantity"
      :showModal="showAddQuantityModal"
      @close="showAddQuantityModal = false"
      @quantity-added="handleQuantityAdded"
    />

    <disburseModal
      v-if="showDisburseModal"
      :selectedItem="selectedItemForDisburse"
      :showModal="showDisburseModal"
      @close="showDisburseModal = false"
      @item-disbursed="handleItemDisbursed"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { CirclePlus, CircleMinus, PencilLine } from 'lucide-vue-next'
import addQuantityModal from '../../../components/addQuantityModal.vue'
import disburseModal from '../../../components/disburseModal.vue'
import sideNav from '../components/sideNav.vue'
import topNav from '../components/topNav.vue'

const inventoryItems = ref([])
const searchQuery = ref('')
const sortKey = ref('itemId')
const sortOrder = ref('asc')
const showAddQuantityModal = ref(false)
const showDisburseModal = ref(false)
const selectedItemForQuantity = ref(null)
const selectedItemForDisburse = ref(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

const headers = [
  { key: 'itemId', label: 'Item ID' },
  { key: 'itemName', label: 'Item Name' },
  { key: 'category', label: 'Category' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'unitOfMeasure', label: 'Unit of Measure' },
  { key: 'expirationDate', label: 'Expiration Date' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'purchaseDate', label: 'Purchase Date' },
]

const sortedAndFilteredData = computed(() => {
  let result = [...inventoryItems.value]
  
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

const paginatedData = computed(() => 
  sortedAndFilteredData.value.slice(startIndex.value, endIndex.value)
)

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

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const displayItems = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/inventory/display')
    inventoryItems.value = res.data.data
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

const formatCellData = (value, key) => {
  if (key === 'expirationDate' || key === 'purchaseDate') {
    return new Date(value).toLocaleDateString('en-US')
  }
  return value
}

const openAddQuantityModal = (item) => {
  selectedItemForQuantity.value = item
  showAddQuantityModal.value = true
}

const openDisburseModal = (item) => {
  selectedItemForDisburse.value = item
  showDisburseModal.value = true
}

const handleQuantityAdded = (updatedItem) => {
  const index = inventoryItems.value.findIndex((item) => item._id === updatedItem._id)
  if (index !== -1) {
    inventoryItems.value[index] = updatedItem
  }
}

const handleItemDisbursed = (updatedItem) => {
  const index = inventoryItems.value.findIndex((item) => item._id === updatedItem._id)
  if (index !== -1) {
    inventoryItems.value[index] = updatedItem
  }
}

displayItems()
</script>
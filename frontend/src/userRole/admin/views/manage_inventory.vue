<template>
  <div>
    <!-- Admin Navbar (top navbar) -->
    <div class="header">
      <topNav />
    </div>

    <div class="page-content flex">
      <!-- Sidebar Navigation -->
      <div class="sidebar ">
        <sideNav />
      </div>

      <!-- Main Content Area -->
      <div class="content flex-grow p-4">
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
                <th class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in paginatedData"
                :key="item._id"
                :class="{ 'bg-gray-50': index % 2 === 0 }"
                class="hover:bg-gray-100 transition-colors duration-200"
              >
                <td v-for="header in headers" :key="header.key" class="border-t border-gray-200 px-6 py-4">
                  {{ header.key === 'expirationDate' || header.key === 'purchaseDate' ? formatDate(item[header.key]) : item[header.key] }}
                </td>
                <td class="border-t border-gray-200 px-6 py-4">
                  <div class="flex space-x-2 justify-center">
                    <button @click="openAddQuantityModal(item)" class="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                      <CirclePlus class="h-5 w-5" />
                    </button>
                    <button @click="openDisburseModal(item)" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <CircleMinus class="h-5 w-5" />
                    </button>
                    <a :href="`/admin/edit-item/`" class="text-green-500 hover:text-green-700 transition-colors duration-200">
                      <PencilLine class="h-5 w-5" />
                    </a>
                  </div>
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
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import axios from 'axios'
import { CirclePlus, CircleMinus, PencilLine } from 'lucide-vue-next'
import addQuantityModal from '../../../components/addQuantityModal.vue'
import disburseModal from '../../../components/disburseModal.vue'
import sideNav from '../components/sideNav.vue'
import topNav from '../components/topNav.vue'

export default {
  components: {
    addQuantityModal,
    disburseModal,
    CirclePlus,
    CircleMinus,
    PencilLine,
    sideNav,
    topNav,
  },
  setup() {
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

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US')
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

    return {
      inventoryItems,
      searchQuery,
      sortKey,
      sortOrder,
      headers,
      sortedAndFilteredData,
      showAddQuantityModal,
      showDisburseModal,
      selectedItemForQuantity,
      selectedItemForDisburse,
      paginatedData,
      currentPage,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      prevPage,
      nextPage,
      sortBy,
      formatDate,
      openAddQuantityModal,
      openDisburseModal,
      handleQuantityAdded,
      handleItemDisbursed,
    }
  }
}
</script>
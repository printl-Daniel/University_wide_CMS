<template>
  <TransitionRoot appear :show="showModal" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-2xl font-medium leading-6 text-gray-900">
                Disbursement History for Item ID: {{ itemId }}
              </DialogTitle>
              <div class="mt-2 overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="record in disbursementHistory" :key="record._id">
                      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{{ record.quantity }}</td>
                      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{{ record.patientName }}</td>
                      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{{ record.college }}</td>
                      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{{ record.reason }}</td>
                      <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-700">{{ new Date(record.date).toLocaleString() }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

const props = defineProps({
  itemId: {
    type: String,
    required: true,
  },
  showModal: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const disbursementHistory = ref([]);

const fetchDisbursementHistory = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/inventory/disbursements/${props.itemId}`);
    disbursementHistory.value = response.data;
  } catch (error) {
    console.error('Error fetching disbursement history:', error);
  }
};

onMounted(() => {
  if (props.showModal) {
    fetchDisbursementHistory();
  }
});

const closeModal = () => {
  emit('close');
};
</script>

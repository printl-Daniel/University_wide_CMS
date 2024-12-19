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
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-2xl font-medium leading-6 text-gray-900">
                Disburse Item: {{ selectedItem.itemName }}
              </DialogTitle>
              <div class="mt-2">
                <div class="text-base text-gray-500">
                  <p><strong>Item ID:</strong> {{ selectedItem.itemId }}</p>
                  <p><strong>Current Quantity:</strong> {{ selectedItem.quantity }}</p>
                  <p><strong>Category:</strong> {{ selectedItem.category }}</p>
                </div>
              </div>

              <form @submit.prevent="disburseItem" class="mt-4">
                <div class="mb-4">
                  <label for="quantityToDisburse" class="block text-base font-medium text-gray-700">Quantity to Disburse:</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="quantityToDisburse"
                      v-model="quantityToDisburse"
                      :max="selectedItem.quantity"
                      min="1"
                      required
                      class="block w-full pr-10 text-base border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter quantity"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <MinusCircleIcon class="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <label for="patientName" class="block text-base font-medium text-gray-700">Patient Name:</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="patientName"
                      v-model="patientName"
                      required
                      class="block w-full pr-10 text-base border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter patient name"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User Icon class="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <label for="college" class="block text-base font-medium text-gray-700">College:</label>
                  <select
                    id="college"
                    v-model="college"
                    required
                    class="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base rounded-md"
                  >
                    <option value="" disabled>Select College</option>
                    <option value="BSIT">BSIT</option>
                    <option value="CBM">CBM</option>
                    <option value="EDUC">ED UC</option>
                    <option value="BTVLED">BTVLED</option>
                    <option value="CAS">CAS</option>
                    <option value="CCJE">CCJE</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="reason" class="block text-base font-medium text-gray-700">Reason for Disbursement:</label>
                  <div class="mt-1">
                    <textarea
                      id="reason"
                      v-model="reason"
                      rows="3"
                      required
                      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full text-base border-gray-300 rounded-md"
                      placeholder="Enter reason"
                    ></textarea>
                  </div>
                </div>

                <TransitionRoot appear :show="!!message" as="template">
                  <div :class="[ 
                    'mt-4 p-4 rounded-md', 
                    isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  ]">
                    <p class="text-base">{{ message }}</p>
                  </div>
                </TransitionRoot>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-6 py-3 text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-6 py-3 text-base font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {{ isSubmitting ? 'Disbursing...' : 'Disburse Item' }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { MinusCircleIcon, UserIcon } from 'lucide-vue-next';

const props = defineProps({
  selectedItem: Object,
  showModal: Boolean,
});

const emit = defineEmits(['close', 'item-disbursed']);

const quantityToDisburse = ref(0);
const patientName = ref('');
const college = ref('');
const reason = ref('');
const isSubmitting = ref(false);
const message = ref('');
const isSuccess = ref(true);

const closeModal = () => {
  emit('close');
  resetForm();
};

const resetForm = () => {
  quantityToDisburse.value = 0;
  patientName.value = '';
  college.value = '';
  reason.value = '';
  message.value = '';
  isSuccess.value = true;
};

const disburseItem = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  message.value = '';

  try {
    const response = await axios.put(
      `http://localhost:5000/api/inventory/disburse/${props.selectedItem.itemId}`,
      {
        quantityToDisburse: quantityToDisburse.value,
        patientName: patientName.value,
        reason: reason.value,
        college: college.value,
      }
    );

    emit('item-disbursed', response.data.item);
    message.value = 'Item successfully disbursed!';
    isSuccess.value = true;

    setTimeout(() => {
      closeModal();
    }, 2000);
  } catch (error) {
    console.error('Error disbursing item:', error.response ? error.response.data : error.message);
    message.value = error.response ? error.response.data.message : 'Unexpected error occurred.';
    isSuccess.value = false;
  } finally {
    isSubmitting.value = false;
  }
};
</script>
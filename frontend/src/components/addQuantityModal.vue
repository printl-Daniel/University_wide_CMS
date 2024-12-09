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
                Add Quantity to {{ selectedItem.itemName }}
              </DialogTitle>
              <div class="mt-2">
                <div class="text-base text-gray-500">
                  <p><strong>Item ID:</strong> {{ selectedItem.itemId }}</p>
                  <p><strong>Current Quantity:</strong> {{ selectedItem.quantity }}</p>
                  <p><strong>Supplier:</strong> {{ selectedItem.supplier }}</p>
                </div>
              </div>

              <form @submit.prevent="addQuantity" class="mt-4">
                <div class="mb-4">
                  <label for="quantityToAdd" class="block text-base font-medium text-gray-700">Quantity to Add:</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="quantityToAdd"
                      v-model="quantityToAdd"
                      min="1"
                      required
                      class="block w-full pr-10 sm:text-lg border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter quantity"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <PlusCircleIcon class="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <label for="responsiblePerson" class="block text-base font-medium text-gray-700">Responsible Person:</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="responsiblePerson"
                      v-model="responsiblePerson"
                      required
                      class="block w-full pr-10 sm:text-lg border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter name"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <UserIcon class="h-6 w-6 text-gray-400" />
                    </div>
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
                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-base font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {{ isSubmitting ? 'Adding...' : 'Add Quantity' }}
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
import { PlusCircleIcon, UserIcon } from 'lucide-vue-next';

const props = defineProps({
  selectedItem: Object,
  showModal: Boolean,
});

const emit = defineEmits(['close', 'quantity-added']);

const quantityToAdd = ref(0);
const responsiblePerson = ref('');
const isSubmitting = ref(false);
const message = ref('');
const isSuccess = ref(true);

const closeModal = () => {
  emit('close');
};

const addQuantity = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  message.value = '';

  try {
    const response = await axios.put(
      `http://localhost:5000/api/inventory/add-quantity/${props.selectedItem.itemId}`,
      {
        quantityToAdd: quantityToAdd.value,
        responsiblePerson: responsiblePerson.value,
      }
    );

    emit('quantity-added', response.data.item);
    message.value = 'Quantity added successfully!';
    isSuccess.value = true;

    setTimeout(() => {
      closeModal();
    }, 2000);
  } catch (error) {
    console.error('Error adding quantity:', error.response ? error.response.data : error.message);
    message.value = error.response ? error.response.data.message : 'Unexpected error occurred.';
    isSuccess.value = false;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

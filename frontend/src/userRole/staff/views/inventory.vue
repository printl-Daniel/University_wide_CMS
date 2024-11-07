<template>
    <v-app>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <!-- Inventory Table -->
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <span class="headline">Clinic Inventory</span>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialog = true">Add Item</v-btn>
              </v-card-title>
              <v-data-table
                v-model:items-per-page="itemsPerPage"
                :headers="headers"
                :items="inventory"
                item-key="id"
                :items-per-page-options="[5, 10, 15]"
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="editItem(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteItem(item.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </v-card>
          </v-col>
        </v-row>
  
        <!-- Add/Edit Item Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span v-if="isEditing">Edit Item</span>
              <span v-else>Add New Item</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="item.name"
                  label="Item Name"
                  :rules="[nameRules]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="item.quantity"
                  label="Quantity"
                  type="number"
                  :rules="[quantityRules]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="item.price"
                  label="Price"
                  type="number"
                  :rules="[priceRules]"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn
                color="blue darken-1"
                :disabled="!valid"
                @click="saveItem"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        valid: false,
        isEditing: false,
        page: 1,
        itemsPerPage: 5,
        inventory: [],
        item: {
          id: null,
          name: '',
          quantity: 0,
          price: 0,
        },
        headers: [
          { text: 'Name', align: 'start', key: 'name', sortable: true },
          { text: 'Quantity', key: 'quantity', sortable: true },
          { text: 'Price', key: 'price', sortable: true },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 50) || 'Name must be less than 50 characters',
        ],
        quantityRules: [
          v => !!v || 'Quantity is required',
          v => v > 0 || 'Quantity must be greater than 0',
        ],
        priceRules: [
          v => !!v || 'Price is required',
          v => v > 0 || 'Price must be greater than 0',
        ],
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.inventory.length / this.itemsPerPage);
      },
    },
    methods: {
      addItem() {
        this.isEditing = false;
        this.item = { id: null, name: '', quantity: 0, price: 0 };
        this.dialog = true;
      },
      editItem(item) {
        this.isEditing = true;
        this.item = { ...item };
        this.dialog = true;
      },
      saveItem() {
        if (this.isEditing) {
          const index = this.inventory.findIndex((i) => i.id === this.item.id);
          if (index !== -1) {
            this.inventory.splice(index, 1, this.item); // Update item in array
          }
        } else {
          this.item.id = Date.now(); // Generate a simple unique ID
          this.inventory.push(this.item); // Add new item to inventory
        }
        this.dialog = false;
      },
      deleteItem(id) {
        const index = this.inventory.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.inventory.splice(index, 1);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-data-table {
    width: 100%; 
  }
  .v-container {
    padding: 0; 
  }
  .v-row {
    margin: 0; 
  }
  </style>
  
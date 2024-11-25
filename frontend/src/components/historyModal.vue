<template>
    <div class="history-modal">
      <div class="modal-overlay" @click="$emit('close')"></div>
      <div class="modal-content">
        <h3>Transaction History</h3>
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Transaction ID</th>
                <th scope="col">Transaction Date</th>
                <th scope="col">Item Name</th>
                <th scope="col">Action Type</th>
                <th scope="col">Quantity Changed</th>
                <th scope="col">Remaining Quantity</th>
                <th scope="col">Responsible Person</th>
                <th scope="col">Reason for Action</th>
                <th scope="col">Supplier</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="history in transactionHistory" :key="history.transactionId">
                <td>{{ history.transactionId }}</td>
                <td>{{ formatDate(history.transactionDate) }}</td>
                <td>{{ history.itemName }}</td>
                <td>{{ history.actionType }}</td>
                <td>{{ history.quantityChanged }}</td>
                <td>{{ history.remainingQuantity }}</td>
                <td>{{ history.responsiblePerson }}</td>
                <td>{{ history.reasonForAction }}</td>
                <td>{{ history.supplier }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-secondary" @click="$emit('close')">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        transactionHistory: [],
      };
    },
    methods: {
      async fetchHistory() {
        try {
          const res = await axios.get('http://localhost:5000/api/history/display-history');
          this.transactionHistory = res.data.history;
        } catch (error) {
          console.error('Error fetching history:', error);
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US'); // formats date to MM/DD/YYYY
      },
    },
    mounted() {
      this.fetchHistory();
    },
  };
  </script>
  
  <style scoped>
  .history-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    max-width: 800px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10000;
  }
  
  h3 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .table-responsive {
    margin-bottom: 20px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  
  .table tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  .table tbody tr:last-child td {
    border-bottom: none;
  }
  
  button {
    background-color: #6c757d;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #5a6268;
  }
  
  button:focus {
    outline: none;
  }
  </style>
  
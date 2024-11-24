<template>
    <div class="audit-modal">
      <div class="modal-overlay" @click="$emit('close')"></div>
      <div class="modal-content">
        <h3>Audit Logs for {{ selectedItem ? selectedItem.itemName : '' }}</h3>
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Audit ID</th>
                <th scope="col">Audit Date</th>
                <th scope="col">Quantity on Record</th>
                <th scope="col">Quantity Counted</th>
                <th scope="col">Discrepancy</th>
                <th scope="col">Reason for Discrepancy</th>
                <th scope="col">Audit Findings</th>
                <th scope="col">Action Taken</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="audit in audits" :key="audit.auditId">
                <td>{{ audit.auditId }}</td>
                <td>{{ formatDate(audit.auditDate) }}</td>
                <td>{{ audit.quantityOnRecord }}</td>
                <td>{{ audit.quantityCounted }}</td>
                <td>{{ audit.discrepancy }}</td>
                <td>{{ audit.reasonForDiscrepancy }}</td>
                <td>{{ audit.auditFindings }}</td>
                <td>{{ audit.actionTaken }}</td>
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
    props: ['selectedItem'],
    data() {
      return {
        audits: [],
      };
    },
    methods: {
      async fetchAuditLogs() {
        if (!this.selectedItem) return;
  
        try {
          const res = await axios.get(`http://localhost:5000/api/audit/get-audit-logs/${this.selectedItem.itemId}`);
          this.audits = res.data.audits;
        } catch (error) {
          console.error('Error fetching audit logs:', error);
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US'); // formats date to MM/DD/YYYY
      },
    },
    watch: {
      selectedItem(newItem) {
        if (newItem) {
          this.fetchAuditLogs(); // Fetch audit logs whenever a new item is selected
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .audit-modal {
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
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  </style>
  
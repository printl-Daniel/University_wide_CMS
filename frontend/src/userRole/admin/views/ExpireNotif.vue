<template>
    <div>
      <!-- Medicine Notification Container -->
      <div v-for="notification in notifications" :key="notification.id" class="notification">
        <p>
          ⚠️ Medicine <strong>{{ notification.name }}</strong> is about to expire on
          <strong>{{ notification.expiryDate }}</strong>.
        </p>
        <button @click="dismissNotification(notification.id)">Dismiss</button>
      </div>
  
      <!-- Medicine List -->
      <div class="medicine-list">
        <h2>Medicines</h2>
        <ul>
          <li v-for="medicine in medicines" :key="medicine.id">
            {{ medicine.name }} - Expiry: {{ medicine.expiryDate }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        medicines: [], // List of medicines fetched from the API
        notifications: [], // List of notifications for expiring medicines
        checkInterval: 60000, // Check every 60 seconds
      };
    },
    methods: {
      // Fetch medicines from an API endpoint
      async fetchMedicines() {
        try {
          const response = await axios.get('/api/inventory');
          this.medicines = response.data;  // Populate medicines array with the fetched data
          this.checkForExpiringMedicines(); // Run initial check after fetching
        } catch (error) {
          console.error('Error fetching medicines:', error);
        }
      },
  
      // Check if any medicines are about to expire
      checkForExpiringMedicines() {
        const today = new Date();
        const warningDays = 7; // Notify if medicine expires in 7 days or less
  
        this.medicines.forEach((medicine) => {
          const expiryDate = new Date(medicine.expiryDate);
          const diffInDays = (expiryDate - today) / (1000 * 60 * 60 * 24);
  
          if (diffInDays <= warningDays && diffInDays > 0) {
            const existingNotification = this.notifications.find(
              (n) => n.id === medicine.id
            );
            if (!existingNotification) {
              this.notifications.push({
                id: medicine.id,
                name: medicine.name,
                expiryDate: medicine.expiryDate,
              });
              this.showToast(medicine.name, medicine.expiryDate);
            }
          }
        });
      },
  
      // Show a toast notification
      showToast(name, expiryDate) {
        const toast = {
          id: Date.now(), // Unique ID for each notification
          message: `⚠️ Medicine ${name} is about to expire on ${expiryDate}.`,
        };
        this.notifications.push(toast);
  
        // Remove the toast after 5 seconds
        setTimeout(() => {
          this.dismissNotification(toast.id);
        }, 5000);
      },
  
      // Dismiss a notification
      dismissNotification(notificationId) {
        this.notifications = this.notifications.filter(
          (n) => n.id !== notificationId
        );
      },
    },
  
    mounted() {
      // Fetch medicines when component mounts
      this.fetchMedicines();
  
      // Periodically check for expiring medicines
      setInterval(() => {
        this.checkForExpiringMedicines();
      }, this.checkInterval);
    },
  };
  </script>
  
  <style>
  /* Notification Styles */
  .notification {
    background: #fff4e5;
    border: 1px solid #f0c14b;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .notification p {
    margin: 0;
  }
  .notification button {
    background: #f0c14b;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
  }
  .notification button:hover {
    background: #ddb347;
  }
  
  /* Medicine List Styles */
  .medicine-list ul {
    list-style: none;
    padding: 0;
  }
  .medicine-list li {
    margin: 5px 0;
  }
  </style>
  
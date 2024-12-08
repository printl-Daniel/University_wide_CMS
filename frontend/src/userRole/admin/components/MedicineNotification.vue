<template>
  <!-- Medicine Notification Container -->
  <div v-for="notification in notifications" :key="notification.id" class="notification">
    <p>
      ⚠️ Medicine <strong>{{ notification.name }}</strong> is about to expire on
      <strong>{{ notification.expiryDate }}</strong>.
    </p>
    <button @click="dismissNotification(notification.id)">Dismiss</button>
  </div>
</template>

<script>
export default {
  props: {
    medicines: Array, // List of medicines from the parent component
  },
  data() {
    return {
      notifications: [], // List of notifications for expiring medicines
      checkInterval: 60000, // Check every 60 seconds
    };
  },
  methods: {
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
    // Check for expiring medicines immediately on load
    this.checkForExpiringMedicines();

    // Periodically check for expiring medicines
    setInterval(() => {
      this.checkForExpiringMedicines();
    }, this.checkInterval);
  },
};
</script>

<style scoped>
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
</style>

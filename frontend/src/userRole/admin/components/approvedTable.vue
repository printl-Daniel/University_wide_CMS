<template>
  <div class="table">
    <table id="appointmentTable" class="display">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date</th>
          <th>Time</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>{{ appointment.name }}</td>
          <td>{{ appointment.email }}</td>
          <td>{{ appointment.phone }}</td>
          <td>{{ appointment.date }}</td>
          <td>{{ appointment.time }}</td>
          <td class="view">
            <a href="#" @click.prevent="openDetailsModal(appointment)">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Details Modal -->
  <div
    v-if="isDetailsModalOpen"
    class="modal-overlay"
    @click="closeDetailsModal"
    aria-labelledby="detailsModal"
    aria-hidden="false"
  >
    <div class="modal-content" @click.stop>
      <h3 id="detailsModal">Appointment Details</h3>
      <p><strong>Name:</strong> {{ selectedAppointment.name }}</p>
      <p><strong>Email:</strong> {{ selectedAppointment.email }}</p>
      <p><strong>Phone:</strong> {{ selectedAppointment.phone }}</p>
      <p><strong>Date:</strong> {{ selectedAppointment.date }}</p>
      <p><strong>Time:</strong> {{ selectedAppointment.time }}</p>
      <p><strong>Notes:</strong> {{ selectedAppointment.notes || "None" }}</p>
      <div>
        <input type="hidden" v-model="appointmentStatus" />
        <button class="btn no-show" @click="approvedUpdateStatus('No-show')">
          No-Show
        </button>
        <button class="btn attended" @click="approvedUpdateStatus('Attended')">
          Attended
        </button>
        <button class="btn close" @click="closeDetailsModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  approvedAppointments,
  updateAppStatus,
} from "../services/appointmentService";

export default {
  mounted() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/table.css";
    document.head.appendChild(link);
  },
  data() {
    return {
      appointments: [],
      isDetailsModalOpen: false,
      selectedAppointment: null,
    };
  },
  async created() {
    try {
      this.appointments = await approvedAppointments();
    } catch (error) {
      console.error("Failed to load appointments:", error);
      alert("Unable to fetch appointments. Please try again later.");
    }
  },
  updated() {
    const tableElement = "#appointmentTable";
    if (!$.fn.DataTable.isDataTable(tableElement)) {
      new DataTable(tableElement, {
        layout: {
          topStart: "pageLength",
          topEnd: "search",
          bottomStart: "info",
          bottomEnd: "paging",
        },
      });
    }
  },
  methods: {
    openDetailsModal(appointment) {
      this.selectedAppointment = appointment;
      this.isDetailsModalOpen = true;
      this.appointmentStatus = "";
    },
    closeDetailsModal() {
      this.selectedAppointment = null;
      this.isDetailsModalOpen = false;
    },
    async approvedUpdateStatus(status) {
      try {
        const formData = {
          id: this.selectedAppointment.id,
          status,
        };
        await updateAppStatus(formData);
        alert(`Appointment marked as ${status}.`);
        this.appointmentStatus = status;
        this.closeDetailsModal();
      } catch (error) {
        console.error("Failed to update appointment status:", error);
        alert("Unable to update status. Please try again later.");
      }
    },
  },
};
</script>
<style scoped>
/* Modal overlay */
.modal-overlay {
  font-family: "Poppins", serif;
  font-weight: 400;
  font-style: normal;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal content */
.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 4rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Modal title */
.modal-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

/* Modal paragraphs */
.modal-content p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.modal-content strong {
  color: #555;
  font-weight: 600;
}

/* Button group */
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 0.5rem;
}

button.attended {
  background-color: #28a745;
  color: white;
  transition: background 0.2s;
}

button.btn-success:hover {
  background-color: #218838;
}

button.no-show {
  background-color: #dc3545;
  color: white;
  transition: background 0.2s;
}

button.btn-danger:hover {
  background-color: #c82333;
}

/* Form Styles */
form label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
}

form input,
form textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  color: #555;
  transition: border-color 0.2s;
}

form input:focus,
form textarea:focus {
  border-color: #007bff;
  outline: none;
}

form textarea {
  resize: vertical;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.loading-spinner span {
  margin-right: 0.5rem;
  font-size: 1rem;
  color: #007bff;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #007bff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

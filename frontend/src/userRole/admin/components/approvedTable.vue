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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

button.no-show {
  background-color: #ff4c4c;
}

button.no-show:hover {
  background-color: #cc0000;
}

button.attended {
  background-color: #28a745;
}

button.attended:hover {
  background-color: #218838;
}

button.close {
  background-color: #6c757d;
}

button.close:hover {
  background-color: #5a6268;
}
</style>

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
          <th>Status</th>
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
          <td>{{ appointment.status }}</td>
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
      <p><strong>Status:</strong> {{ selectedAppointment.status }}</p>
      <p><strong>Notes:</strong> {{ selectedAppointment.notes || "None" }}</p>
      <div class="btn-group">
        <button class="btn" @click="closeDetailsModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAppointmentOutcomes } from "../services/appointmentService";

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
      this.appointments = await fetchAppointmentOutcomes();
    } catch (error) {
      console.error("Failed to load appointments:", error);
      alert(
        "Unable to fetch appointments. Please check your connection and try again."
      );
    }
  },
  updated() {
    const tableElement = "#appointmentTable";
    if (!$.fn.DataTable.isDataTable(tableElement)) {
      $(tableElement).DataTable({
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
    },
    closeDetailsModal() {
      this.selectedAppointment = null;
      this.isDetailsModalOpen = false;
    },
  },
};
</script>

<style scoped>
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

/* Buttons */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-success {
  background-color: #4caf50;
  color: white;
}

.btn-success:hover {
  background-color: #45a049;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.btn-danger:hover {
  background-color: #da190b;
}

.btn:last-child {
  background-color: #f0f0f0;
  color: #333;
}

.btn:last-child:hover {
  background-color: #e0e0e0;
}
</style>

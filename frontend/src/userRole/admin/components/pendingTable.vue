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
        <button class="btn btn-success" @click="openApprovalModal('Approved')">
          Approve
        </button>
        <button class="btn btn-danger" @click="openApprovalModal('Declined')">
          Decline
        </button>
        <button class="btn" @click="closeDetailsModal">Close</button>
      </div>
    </div>
  </div>

  <!-- Approval Modal -->
  <div
    v-if="isApprovalModalOpen"
    class="modal-overlay"
    @click="closeApprovalModal"
    aria-labelledby="approvalModal"
    aria-hidden="false"
  >
    <div class="modal-content" @click.stop>
      <h3 id="approvalModal">Approval Form</h3>
      <form @submit.prevent="submitApproval">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" required />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />

        <label for="campus">Campus:</label>
        <input type="text" id="campus" v-model="formData.campus" required />

        <label for="date">Date:</label>
        <input type="date" id="date" v-model="formData.date" required />

        <label for="time">Time:</label>
        <input type="time" id="time" v-model="formData.time" required />

        <label for="message">Message:</label>
        <textarea id="message" v-model="formData.additionalMessage"></textarea>

        <!-- Loading Spinner -->
        <div v-if="isLoading" class="loading-spinner">
          <span>Submitting...</span>
          <div class="spinner"></div>
        </div>

        <button type="submit" :disabled="isLoading">Submit</button>
        <button type="button" @click="closeApprovalModal" :disabled="isLoading">
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  pendingAppointments,
  submitApproval,
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
      isApprovalModalOpen: false,
      isLoading: false,
      selectedAppointment: null,
      formData: {
        id: "",
        status: "",
        name: "",
        email: "",
        campus: "",
        date: "",
        time: "",
        additionalMessage: "",
      },
    };
  },
  async created() {
    try {
      this.appointments = await pendingAppointments();
    } catch (error) {
      console.error("Failed to load appointments:", error);
      alert("Unable to fetch appointments. Please try again later.");
    }
  },
  updated() {
    const tableElement = "#appointmentTable";
    if (!$.fn.DataTable.isDataTable(tableElement)) {
      new DataTable(tableElement, {
        pageLength: 10,
        lengthChange: false,
        layout: {
          topStart: null,
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
    openApprovalModal(status) {
      this.isApprovalModalOpen = true;
      this.formData = {
        id: this.selectedAppointment.id,
        status,
        name: this.selectedAppointment.name,
        email: this.selectedAppointment.email,
        campus: this.selectedAppointment.campus || "Not Provided",
        date: this.selectedAppointment.date,
        time: this.selectedAppointment.time,
        additionalMessage: "",
      };
    },
    closeApprovalModal() {
      this.isApprovalModalOpen = false;
      this.formData = {
        id: "",
        status: "",
        name: "",
        email: "",
        campus: "",
        date: "",
        time: "",
        additionalMessage: "",
      };
    },
    async submitApproval() {
      try {
        this.isLoading = true;
        await submitApproval(this.formData);
        alert("Approval submitted successfully.");
        this.closeApprovalModal();
        this.closeDetailsModal();
        this.appointments = await pendingAppointments();
      } catch (error) {
        console.error("Failed to submit approval:", error);
        alert("Failed to submit approval. Please try again.");
      } finally {
        this.isLoading = false;
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

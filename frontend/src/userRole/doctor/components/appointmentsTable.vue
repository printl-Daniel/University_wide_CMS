<template>
  <div>
    <h1>Appointment List</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date</th>
          <th>Time</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>{{ appointment.name }}</td>
          <td>{{ appointment.email }}</td>
          <td>{{ appointment.phone }}</td>
          <td>{{ appointment.date }}</td>
          <td>{{ appointment.time }}</td>
          <td>{{ appointment.notes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { fetchAppointments } from "../services/appointmentService";

export default {
  data() {
    return {
      appointments: [],
    };
  },
  async created() {
    try {
      this.appointments = await fetchAppointments();
    } catch (error) {
      console.error("Failed to load appointments:", error);
    }
  },
};
</script>

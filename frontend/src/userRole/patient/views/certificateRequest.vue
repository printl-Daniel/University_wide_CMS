<template>
  <div>
    <!-- Navbar -->
    <PatientNavbar />

    <!-- Request Medical Certificate Form -->
    <div class="certificate-request-container">
      <h2 class="form-title">Request Medical Certificate</h2>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="loading-indicator">
        <p>Sending your request...</p>
      </div>

      <form v-if="!isLoading" @submit.prevent="submitRequest">
        <!-- Sender Name Field -->
        <div class="form-group">
          <label for="senderName" class="form-label">Sender Name</label>
          <input
            type="text"
            id="senderName"
            v-model="senderName"
            class="form-input"
            required
            placeholder="Enter your name"
          />
        </div>

        <!-- Reason for Request Field -->
        <div class="form-group">
          <label for="reason" class="form-label">Reason for Request</label>
          <textarea
            id="reason"
            v-model="reason"
            class="form-input"
            rows="4"
            required
            placeholder="Describe the purpose for requesting a medical certificate"
          ></textarea>
        </div>

        <!-- Contact Information Field -->
        <div class="form-group">
          <label for="contact" class="form-label">Contact Information</label>
          <input
            type="text"
            id="contact"
            v-model="contact"
            class="form-input"
            required
            placeholder="Enter your email or phone number"
          />
        </div>

        <!-- From (Sender Email) Field -->
        <div class="form-group">
          <label for="from" class="form-label">From (Email Address)</label>
          <input
            type="email"
            id="from"
            v-model="from"
            class="form-input"
            required
            placeholder="Enter your email address"
          />
        </div>

        <!-- Submission Button -->
        <button type="submit" class="form-button">Submit Request</button>
      </form>

      <!-- Response Message -->
      <p v-if="responseMessage">{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script>
import PatientNavbar from "../components/patientNavbar.vue";
import { emailService } from "../services/emailServices"; // Import email service

export default {
  components: {
    PatientNavbar,
  },
  data() {
    return {
      senderName: "", // Sender name input field
      reason: "", // Reason for requesting the certificate
      contact: "", // Contact (email/phone) input field
      from: "", // From (email) address field
      responseMessage: "", // To store success/error messages
      isLoading: false, // To handle loading state
    };
  },
  methods: {
    async submitRequest() {
      this.isLoading = true; // Show loading indicator

      try {
        // Prepare the email data with dynamic values
        const emailData = {
          from: this.from, // Sender's email
          senderName: this.senderName, // Sender's name (displayed in email)
          contact: this.contact, // Contact info (email or phone)
          reason: this.reason, // Reason for requesting the certificate
        };

        // Send email using the service
        const message = await emailService.sendEmail(emailData);
        this.responseMessage = message; // Show success message
      } catch (error) {
        this.responseMessage = error.message; // Show error message
      } finally {
        this.isLoading = false; // Hide loading indicator
      }
    },
  },
};
</script>

<style scoped>
.certificate-request-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 25px;
  border: 2px solid #4caf50; /* Green border to match a health-oriented theme */
  border-radius: 10px;
  background-color: #f4fdf4; /* Light greenish background for a calm appearance */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #2e7d32;
  margin-bottom: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-weight: 600;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #4caf50;
  outline: none;
}

.form-button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 5px;
  background-color: #4caf50; /* Green button */
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.form-button:hover {
  background-color: #388e3c;
}

.loading-indicator {
  text-align: center;
  font-size: 1.2rem;
  color: #388e3c;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .certificate-request-container {
    padding: 20px;
  }

  .form-title {
    font-size: 1.5rem;
  }
}
</style>

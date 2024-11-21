<template>
  <body>
    <div class="header">
      <TopNav />
    </div>
    <div class="page-content">
      <div class="sidebar">
        <SideNav />
      </div>
      <div class="form-container">
        <div v-if="isLoading" class="loading-indicator">
          <p>Sending your request...</p>
        </div>
        <form v-if="!isLoading" @submit.prevent="submitRequest" class="form">
          <!-- Sender Name Field -->
          <div class="form-group name">
            <h6>Sender Name:</h6>
            <input
              type="text"
              id="senderName"
              v-model="senderName"
              class="form-input"
              required
              placeholder="Enter your name"
            />
          </div>

          <!-- From (Sender Email) Field -->
          <div class="form-group subject">
            <h6>Subject:</h6>
            <input
              type="text"
              id="subject"
              v-model="subject"
              class="form-input"
              required
              placeholder="Enter your email address"
            />
          </div>

          <!-- Contact Information Field -->
          <div class="form-group contact">
            <h6>Contact Information:</h6>
            <input
              type="text"
              id="contact"
              v-model="contact"
              class="form-input"
              required
              placeholder="Enter your email or phone number"
            />
          </div>

          <!-- Reason for Request Field -->
          <div class="form-group">
            <h6>Message</h6>
            <textarea
              id="message"
              v-model="message"
              class="form-input"
              rows="4"
              required
              placeholder="Describe the purpose for requesting a medical certificate"
            ></textarea>
          </div>
          <button type="submit" class="submit">Submit Email</button>
        </form>
        <!-- Response Message -->
        <p v-if="responseMessage">{{ responseMessage }}</p>
      </div>
    </div>
  </body>
</template>

<script>
import TopNav from "../components/topNav.vue";
import SideNav from "../components/sideNav.vue";
import { emailService } from "../services/emailServices";

export default {
  components: {
    TopNav,
    SideNav,
  },
  mounted() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/patient/mailPatient.css";
    document.head.appendChild(link);
  },
  data() {
    return {
      senderName: "",
      message: "",
      contact: "",
      subject: "",
      from: "",
      responseMessage: "",
      isLoading: false,
    };
  },
  methods: {
    async submitRequest() {
      this.isLoading = true;
      try {
        const emailData = {
          from: this.from,
          senderName: this.senderName,
          subject: this.subject,
          contact: this.contact,
          message: this.reason,
        };
        const message = await emailService.sendEmail(emailData);
        this.responseMessage = message;
      } catch (error) {
        this.responseMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped></style>

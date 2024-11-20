<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title text-center">Register</h5>
        <h6 class="card-subtitle mb-2 text-muted text-center">Create your account</h6>

        <!-- Registration Form -->
        <form @submit.prevent="register">
          <!-- First Name Field -->
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="form.firstName"
              placeholder="Enter your first name"
              required
            />
          </div>

          <!-- Last Name Field -->
          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="form.lastName"
              placeholder="Enter your last name"
              required
            />
          </div>

          <!-- Email Field -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="form.email"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Contact Info Field -->
          <div class="mb-3">
            <label for="contactInfo" class="form-label">Contact Info</label>
            <input
              type="text"
              class="form-control"
              id="contactInfo"
              v-model="form.contactInfo"
              placeholder="Enter your contact info"
              required
            />
          </div>

          <!-- Password Field -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="form.password"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Error or Success Message -->
          <div v-if="message" :class="{'alert alert-success': success, 'alert alert-danger': !success}" class="mt-3">
            {{ message }}
          </div>

          <!-- Register Button -->
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>

        <!-- Login Link -->
        <div class="text-center mt-3">
          <p>Already have an account? <router-link to="/" class="text-primary">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        firstName: "", // First name of the user
        lastName: "",  // Last name of the user
        email: "",     // User's email
        contactInfo: "", // Contact information
        password: "",  // Password to create the account
      },
      message: "", // Success or error message
      success: false, // Boolean to toggle between success or error messages
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post("http://localhost:5000/api/patient/register", this.form);
        this.message = response.data.message;
        this.success = true;
        this.$router.push({ name: 'otpVerification', params: { otpToken: response.data.otpToken } });

        // Clear form fields after successful registration
        this.form = {
          firstName: "",
          lastName: "",
          email: "",
          contactInfo: "",
          password: "",
        };
      } catch (error) {
        this.message = error.response?.data?.message || "Error registering.";
        this.success = false;
      }
    },
  },
};
</script>

<style>
/* Styling for card and alignment */
.container {
  min-height: 100vh;
}
.card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.alert {
  margin-top: 10px;
}
</style>

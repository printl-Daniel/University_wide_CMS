<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card" style="width: 25rem;">
      <div class="card-body">
        <h5 class="card-title text-center">Patient Registration</h5>
        <h6 class="card-subtitle mb-2 text-muted text-center">Create an account</h6>

        <!-- Register Form -->
        <form @submit.prevent="register">
          <!-- Full Name Fields (Split into First and Last Name) -->
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="firstName"
              required
            />
          </div>

          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="lastName"
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
              v-model="email"
              required
            />
          </div>

          <!-- Contact Info Field -->
          <div class="mb-3">
            <label for="contactInfo" class="form-label">Contact Information</label>
            <input
              type="text"
              class="form-control"
              id="contactInfo"
              v-model="contactInfo"
              required
            />
          </div>

          <!-- Medical History Access Field -->
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="medicalHistoryAccess"
              v-model="medicalHistoryAccess"
            />
            <label class="form-check-label" for="medicalHistoryAccess">Allow access to your medical history</label>
          </div>

          <!-- Password Field -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <!-- Register Button -->
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>

        <!-- Already have an account link -->
        <p class="text-center mt-3">
          Already have an account? <router-link to="/" class="text-primary">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      contactInfo: "",
      password: "",
      medicalHistoryAccess: false, // Default to false
      errorMessage: "",
    };
  },
  methods: {
    async register() {
      try {
        // Send data to backend for registration
        const response = await axios.post("http://localhost:5000/api/patients", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          contactInfo: this.contactInfo,
          password: this.password,
          medicalHistoryAccess: this.medicalHistoryAccess,
        });

        // Handle success
        if (response.status === 200) {
          this.$router.push("/login"); // Redirect to login page after successful registration
        }
      } catch (error) {
        // Handle error
        this.errorMessage =
          error.response?.data?.message || "Registration failed. Please try again.";
      }
    },
  },
};
</script>

<style>
/* Styling for the register page */
.card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.alert {
  margin-top: 10px;
}
</style>

<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card" style="width: 25rem;">
      <div class="card-body">
        <h5 class="card-title text-center">Login</h5>
        <h6 class="card-subtitle mb-2 text-muted text-center">Enter your credentials</h6>

        <!-- Login Form -->
        <form @submit.prevent="login">
          <!-- Username Field -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
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
              v-model="password"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <!-- Login Button -->
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>

        <!-- Sign Up Link -->
        <div class="text-center mt-3">
          <p>Don't have an account? <router-link to="/register" class="text-primary">Sign Up</router-link></p>
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
      username: "", // Stores the entered username
      password: "", // Stores the entered password
      errorMessage: "", // Stores error messages to display
    };
  },
  methods: {
    async login() {
      try {
        // Send a POST request to the backend with the username and password
        const response = await axios.post("http://localhost:5000/api/login", {
          username: this.username,
          password: this.password,
        });

        if (response.data) {
          // Save user details to localStorage
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("userID", response.data.userID);

          // Redirect based on the user's role
          if (response.data.role === "admin") {
            this.$router.push("/admin/dashboard");
          } else if (response.data.role === "staff") {
            this.$router.push("/staff/dashboard");
          } else {
            this.$router.push("/user/dashboard");
          }
        }
      } catch (error) {
        // Display an error message if the login fails
        this.errorMessage =
          error.response?.data?.errorMessage || "Login failed. Please try again.";
      }
    },
  },
};
</script>

<style>
/* Basic styling for card and login form */
.card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.alert {
  margin-top: 10px;
}
</style>

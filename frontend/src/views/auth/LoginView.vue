<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card">
      <!-- Logo -->
      <div class="text-center">
        <img
          src="/img/icons/logo.png"
          alt="Logo"
          class="logo"
        />
      </div>

      <div class="card-body">
        <h5 class="card-title text-center">Login</h5>
        <h6 class="card-subtitle mb-3 text-muted text-center">
          Enter your credentials
        </h6>

        <!-- Login Form -->
        <form @submit.prevent="login">
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

          <!-- Error Message -->
          <div v-if="message" class="alert alert-danger">
            {{ message }}
          </div>

          <!-- Login Button -->
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>

        <!-- Sign Up Link -->
        <div class="text-center mt-3">
          <p>
            Don't have an account?
            <router-link to="/register" class="text-primary">Sign Up</router-link>
          </p>
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
        email: "", // Stores the entered email
        password: "", // Stores the entered password
      },
      message: "", // Stores error messages to display
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/patient/login",
          {
            email: this.email,
            password: this.password,
          }
        );
        this.message = response.data.message;

        // Store JWT token in localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to /patient/dashboard
        this.$router.push("/patient/dashboard");
      } catch (error) {
        // Handle error response
        this.message =
          error.response?.data?.message || "Login failed. Please try again.";
        this.form.password = ""; // Clear the password field
      }
    },
  },
};
</script>

<style>
/* Styling for the login card */
.container {
  min-height: 100vh;
}

.card {
  width: 25rem;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.logo {
  max-width: 100px;
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-subtitle {
  font-size: 1rem;
  color: #6c757d;
}

.form-label {
  font-weight: 500;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.alert {
  margin-top: 10px;
}

.text-primary {
  color: #007bff;
}

.text-primary:hover {
  text-decoration: underline;
}
</style>

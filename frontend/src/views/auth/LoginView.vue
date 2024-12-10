<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card">
      <!-- Logo -->
      <div class="logoMinsu">
        <div class="text-center">
          <img
            src="/img/icons/logo.png"
            alt="Logo"
            class="logo"
          />
        </div>
      </div>

      <div class="card-body">
        <h5 class="card-title text-center">Login</h5>
        <h6 class="card-subtitle mb-3 text-muted text-center">
          Enter your credentials
        </h6>

        <!-- Login Form -->
        <form @submit.prevent="login">
          <!-- Email Field -->
          <div class="inputGroup">
            <input
              type="text"
              id="username"
              v-model="form.username"
              required
              autocomplete="off"
            />
            <label for="username">Username</label>
          </div>

          <!-- Password Field -->
          <div class="inputGroup">
            <input
              type="password"
              id="password"
              v-model="form.password"
              required
              autocomplete="off"
            />
            <label for="password">Password</label>
          </div>

          <!-- Error Message -->
          <div v-if="message" class="alert alert-danger">
            {{ message }}
          </div>

          <div class="button-container">
            <button class="button type1">
              <span class="btn-txt">Login</span>
            </button>
          </div>

        </form>
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
          "http://localhost:5000/api/user/login",
          {
            username: this.form.username,
            password: this.form.password,
          }
        );
        if (response.data.resetRequired) {
          // Redirect to reset password page if it's the first login
          this.$router.push("/reset-password");
        } else {
          // Store JWT token in localStorage
          localStorage.setItem("token", response.data.token);

          // Redirect to the user dashboard
          this.$router.push("admin/dashboard");
        }
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

.logoMinsu {
  border-bottom: 1px solid rgb(194, 194, 206);
  display: flex; 
  justify-content: center;
  align-items: center; 
}
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

/* Custom Styles from Universe.io by Maximinodotpy */

.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin: 1em 0;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(133, 132, 132);
  background-color: transparent;
  border-radius: 20px;
  width: 100%;
}

.inputGroup label {
  font-size: 100%;
  position: absolute;
  left: 0;
  padding: 0.8em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: rgb(100, 100, 100);
}

.inputGroup :is(input:focus, input:valid) ~ label {
  transform: translateY(-50%) scale(0.9);
  margin: 0;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #ffffff;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: rgb(90, 90, 216);
}

/* Additional Styles */
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

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Optional, adds space between the form fields and the button */
}

.button {
  height: 50px;
  width: 200px;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  border: 2px solid #252525;
  overflow: hidden;
  border-radius: 30px;
  color: #333;
  transition: all 0.5s ease-in-out;
}

.btn-txt {
  z-index: 1;
  font-weight: 800;
  letter-spacing: 4px;
}

.type1::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.5s ease-in-out;
  background-color: #333;
  border-radius: 30px;
  visibility: hidden;
  height: 10px;
  width: 10px;
  z-index: -1;
}

.button:hover {
  box-shadow: 1px 1px 200px #252525;
  color: #000000;
  border: none;
}

.type1:hover::after {
  visibility: visible;
  transform: scale(100) translateX(2px);
}

</style>

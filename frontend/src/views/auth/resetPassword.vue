<template>
    <div class="container d-flex align-items-center justify-content-center vh-100">
      <div class="card">
        <!-- Logo -->
        <div class="logoMinsu">
          <div class="text-center">
            <img src="/img/icons/logo.png" alt="Logo" class="logo" />
          </div>
        </div>
  
        <div class="card-body">
          <h5 class="card-title text-center">Reset Password</h5>
          <h6 class="card-subtitle mb-3 text-muted text-center">Enter your new password</h6>
  
          <!-- Reset Password Form -->
          <form @submit.prevent="resetPassword">
            <!-- New Password Field -->
            <div class="inputGroup">
              <input
                type="password"
                id="newPassword"
                v-model="form.newPassword"
                required
                autocomplete="off"
              />
              <label for="newPassword">New Password</label>
            </div>
  
            <!-- Confirm Password Field -->
            <div class="inputGroup">
              <input
                type="password"
                id="confirmPassword"
                v-model="form.confirmPassword"
                required
                autocomplete="off"
              />
              <label for="confirmPassword">Confirm Password</label>
            </div>
  
            <!-- Error Message -->
            <div v-if="message" class="alert alert-danger">
              {{ message }}
            </div>
  
            <div class="button-container">
              <button class="button type1">
                <span class="btn-txt">Reset Password</span>
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
          newPassword: "",        // Stores the entered new password
          confirmPassword: "",    // Stores the entered confirm password
        },
        message: "",             // Stores error messages to display
      };
    },
    methods: {
      async resetPassword() {
      // Check if passwords match
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.message = "Passwords do not match!";
        return;
      }

      try {
        // Send POST request to reset password
        const response = await axios.post(
          "http://localhost:5000/api/user/reset-password", 
          {
            newPassword: this.form.newPassword,
            confirmPassword: this.form.confirmPassword,
          }
        );

        // Handle success
        this.message = response.data.message;  // Success message from API
        this.$router.push("/");  // Redirect to login page after password reset

      } catch (error) {
        // Handle error
        console.error(error);
        this.message = error.response?.data?.message || "Error resetting password. Please try again.";
      }
    },

    },
  };
  </script>
  
  <style>
  .logoMinsu {
    border-bottom: 1px solid rgb(194, 194, 206);
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
  
  .inputGroup {
    font-family: "Segoe UI", sans-serif;
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
  
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
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
  
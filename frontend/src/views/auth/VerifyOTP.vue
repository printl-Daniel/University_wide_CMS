<template>
    <div class="otp-verification-container">
      <div class="otp-card">
        <h2 class="otp-header">Verify Your OTP</h2>
        <p class="otp-message" :class="{'error': isError}">{{ message }}</p>
        <form @submit.prevent="verifyOTP" class="otp-form">
          <input
            v-model="otp"
            type="text"
            class="otp-input"
            placeholder="Enter OTP"
            maxlength="6"
            required
          />
          <button type="submit" class="otp-button">Verify</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        otp: "",
        message: "",
        isError: false,
      };
    },
    methods: {
      async verifyOTP() {
        try {
          const response = await axios.post("http://localhost:5000/api/patient/verify-otp", {
            otp: this.otp,
          });
          this.message = "OTP verified successfully! You can now log in.";
          this.isError = false;
          setTimeout(() => {
            this.$router.push("/"); // Redirect to login page
          }, 2000);
        } catch (error) {
          this.message = error.response?.data?.message || "Invalid OTP. Please try again.";
          this.isError = true;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container for centering */
  .otp-verification-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f7f7f7;
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  /* Card styling */
  .otp-card {
    background-color: #ffffff;
    padding: 30px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  
  /* Header styling */
  .otp-header {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333333;
  }
  
  /* Message styling */
  .otp-message {
    margin: 10px 0;
    font-size: 14px;
    color: #4caf50;
  }
  
  .otp-message.error {
    color: #f44336;
  }
  
  /* Form styling */
  .otp-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  /* Input field styling */
  .otp-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .otp-input:focus {
    border-color: #4caf50;
  }
  
  /* Button styling */
  .otp-button {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .otp-button:hover {
    background-color: #45a049;
  }
  </style>
  
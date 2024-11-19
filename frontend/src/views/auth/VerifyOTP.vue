<template>
    <div class="verify-otp">
      <h2>Verify OTP</h2>
      <form @submit.prevent="verifyOTP">
        <div>
          <label for="otp">Enter OTP:</label>
          <input type="text" v-model="otp" required />
        </div>
        <button type="submit" :disabled="isSubmitting">Verify OTP</button>
      </form>
  
      <div v-if="errorMessage" class="error">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-if="successMessage" class="success">
        <p>{{ successMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        otp: '',
        errorMessage: '',
        successMessage: '',
        isSubmitting: false,
      };
    },
    methods: {
        async verifyOTP() {
            const email = this.$route.params.email; // Assuming email is passed through the route
            this.isSubmitting = true;
            try {
                const response = await axios.post('http://localhost:5000/api/patient/verifyOTP', {
                email,
                otp: this.otp
                });
                this.successMessage = response.data.message;
                this.errorMessage = '';
                // Redirect to another page after successful verification, e.g., login or dashboard
                this.$router.push({ name: 'login' });
            } catch (error) {
                console.error(error); // Log the entire error object to check its details
                this.errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
                this.successMessage = '';
            } finally {
                this.isSubmitting = false;
            }
        }

    }
  };
  </script>
  
  <style scoped>
  .verify-otp {
    max-width: 400px;
    margin: 0 auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  form div {
    margin-bottom: 10px;
  }
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>
  
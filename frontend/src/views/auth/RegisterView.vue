<template>
  <div class="register">
    <h2>Register as a Patient</h2>
    <form @submit.prevent="registerPatient">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" v-model="firstName" required />
      </div>
      
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="lastName" required />
      </div>
      
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      
      <div>
        <label for="contactInfo">Contact Info:</label>
        <input type="text" v-model="contactInfo" required />
      </div>
      
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      
      <button type="submit">Register</button>
    </form>

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
    <div v-if="successMessage" class="success">
      <p>{{ successMessage }}</p>
    </div>

    <!-- Link to Login page if user already has an account -->
    <div class="login-link">
      <p>Already have an account? <router-link to="/">Login</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      contactInfo: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async registerPatient() {
      try {
        const response = await axios.post('http://localhost:5000/api/patient/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          contactInfo: this.contactInfo,
          password: this.password,
        });
        this.successMessage = 'Patient registered successfully!';
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = 'Error registering patient. Please try again.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
/* Add some styles for your registration form */
.register {
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
.error {
  color: red;
}
.success {
  color: green;
}
.login-link {
  margin-top: 10px;
  text-align: center;
}
.login-link a {
  color: #4CAF50;
  text-decoration: none;
}
.login-link a:hover {
  text-decoration: underline;
}
</style>

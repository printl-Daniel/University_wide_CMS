<template>
    <div>
      <!-- Navbar -->
      <div>
        <PatientNavbar />
      </div>
  
      <!-- Request Medical Certificate Form -->
      <div class="certificate-request-container">
        <h2 class="form-title">Request Medical Certificate</h2>
        <form @submit.prevent="submitRequest">
          <!-- Full Name Field -->
          <div class="form-group">
            <label for="fullName" class="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              v-model="fullName"
              class="form-input"
              required
              placeholder="Enter your full name"
            />
          </div>
  
          <!-- Date of Birth Field -->
          <div class="form-group">
            <label for="dob" class="form-label">Date of Birth</label>
            <input
              type="date"
              id="dob"
              v-model="dob"
              class="form-input"
              required
            />
          </div>
  
          <!-- Reason for Request Field -->
          <div class="form-group">
            <label for="reason" class="form-label">Reason for Request</label>
            <textarea
              id="reason"
              v-model="reason"
              class="form-input"
              rows="4"
              required
              placeholder="Describe the purpose for requesting a medical certificate"
            ></textarea>
          </div>
  
          <!-- Contact Information Field -->
          <div class="form-group">
            <label for="contact" class="form-label">Contact Information</label>
            <input
              type="text"
              id="contact"
              v-model="contact"
              class="form-input"
              required
              placeholder="Enter your email or phone number"
            />
          </div>
  
          <!-- Submission Button -->
          <button type="submit" class="form-button">Submit Request</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import PatientNavbar from '../components/patientNavbar.vue';
  
  export default {
    components: {
      PatientNavbar
    },
    data() {
      return {
        fullName: '',
        dob: '',
        reason: '',
        contact: ''
      };
    },
    methods: {
      submitRequest() {
        alert('Your medical certificate request has been submitted.');
        // Add form handling logic here
      }
    }
  };
  </script>
  
  <style scoped>
  .certificate-request-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 25px;
    border: 2px solid #4caf50; /* Green border to match a health-oriented theme */
    border-radius: 10px;
    background-color: #f4fdf4; /* Light greenish background for a calm appearance */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    text-align: center;
    color: #2e7d32;
    margin-bottom: 20px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-label {
    font-weight: 600;
    color: #555;
    display: block;
    margin-bottom: 5px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }
  
  .form-input:focus {
    border-color: #4caf50;
    outline: none;
  }
  
  .form-button {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #4caf50; /* Green button */
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 15px;
  }
  
  .form-button:hover {
    background-color: #388e3c;
  }
  
  @media (max-width: 768px) {
    .certificate-request-container {
      padding: 20px;
    }
  
    .form-title {
      font-size: 1.5rem;
    }
  }
  </style>
  
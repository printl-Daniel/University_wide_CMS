<template>
    <div>
      <!-- Navbar -->
      <div>
        <PatientNavbar />
      </div>
  
      <!-- Feedback Submission Form -->
      <div class="feedback-container">
        <h2 class="form-title">Submit Your Feedback</h2>
        <form @submit.prevent="submitFeedback">
          <!-- Feedback Type Selection -->
          <div class="form-group">
            <label for="feedbackType" class="form-label">Feedback Type</label>
            <select id="feedbackType" v-model="feedbackType" class="form-input-select" required>
              <option disabled value="">Select a feedback type</option>
              <option value="general">General Feedback</option>
              <option value="service">Service Feedback</option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
              <option value="other">Other</option>
            </select>
          </div>
  
          <!-- Feedback Message Field -->
          <div class="form-group">
            <label for="message" class="form-label">Your Feedback</label>
            <textarea
              id="message"
              v-model="message"
              class="form-input"
              rows="5"
              required
              placeholder="Provide your feedback here"
            ></textarea>
          </div>
  
          <!-- Contact Information (Optional) -->
          <div class="form-group">
            <label for="contactInfo" class="form-label">Contact Information (optional)</label>
            <input
              type="text"
              id="contactInfo"
              v-model="contactInfo"
              class="form-input"
              placeholder="Email or phone number"
            />
          </div>
  
          <!-- Submission Button -->
          <button type="submit" class="form-button">Submit Feedback</button>
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
        feedbackType: '',
        message: '',
        contactInfo: ''
      };
    },
    methods: {
      submitFeedback() {
        alert('Thank you for your feedback!');
        // Add form handling logic here
      }
    }
  };
  </script>
  
  <style scoped>
  .feedback-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 25px;
    border: 2px solid #388e3c; /* Dark green accent */
    border-radius: 10px;
    background-color: #e8f5e9; /* Light greenish background */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    text-align: center;
    color: #2e7d32; /* Dark green */
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
  
  .form-input,
  .form-input-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }
  
  .form-input:focus,
  .form-input-select:focus {
    border-color: #388e3c;
    outline: none;
  }
  
  .form-button {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #388e3c; /* Green button */
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 15px;
  }
  
  .form-button:hover {
    background-color: #2e7d32;
  }
  
  @media (max-width: 768px) {
    .feedback-container {
      padding: 20px;
    }
  
    .form-title {
      font-size: 1.5rem;
    }
  }
  </style>
  
<template>
  <div class="feedback-container">
    <div class="feedback-form" v-if="!submitted">
      <div><h4>We'd love to hear your feedback!</h4></div>
      <form @submit.prevent="submitFeedback">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            placeholder="Enter your name"
          />
        </div>
        <div class="form-group">
          <label for="email">Your Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            v-model="feedback"
            placeholder="Please share your thoughts..."
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" :disabled="!isFormValid">Submit Feedback</button>
      </form>
    </div>
    <div class="feedback-success" v-else>
      <h2>Thank You!</h2>
      <p>Your feedback has been submitted successfully.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

const name = ref("");
const email = ref("");
const feedback = ref("");
const submitted = ref(false);

const isFormValid = computed(() => {
  return (
    name.value.trim() !== "" &&
    email.value.trim() !== "" &&
    feedback.value.trim() !== ""
  );
});

const submitFeedback = () => {
  console.log("Feedback submitted:", {
    name: name.value,
    email: email.value,
    feedback: feedback.value,
  });
  submitted.value = true;
};
</script>

<style scoped>
.feedback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  padding: 20px;
  flex-direction: column;
}

.feedback-form,
.feedback-success {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
}

h4 {
  color: #333;
  font-size: 0.9rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 900;
  color: #333;
  font-size: 0.7rem;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  @media (max-width: 600px) {
    .feedback-container {
      height: 80vh;
      justify-content: start;
      padding: 2rem;
    }
    .feedback-form,
    .feedback-success {
      padding: 1rem;
      gap: 7vh;
      display: flex;
      flex-direction: column;
    }
    form {
      gap: 4vh;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  }

  h2 {
    font-size: 1.25rem;
  }

  input,
  textarea,
  button {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .feedback-form,
  .feedback-success {
    padding: 1rem;
  }

  h2 {
    font-size: 1rem;
  }

  input,
  textarea,
  button {
    font-size: 0.85rem;
  }

  button {
    padding: 0.6rem;
  }
}
</style>

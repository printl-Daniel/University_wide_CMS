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
            rows="13"
            required
          ></textarea>
        </div>
        <div class="button-container">
          <button type="submit" :disabled="!isFormValid">
            Submit Feedback
          </button>
        </div>
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
import firebase from "../firebase";
const { db } = firebase;

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

const submitFeedback = async () => {
  console.log("Feedback submitted:", {
    name: name.value,
    email: email.value,
    feedback: feedback.value,
  });

  const feedbackRef = collection(db, "feedbacks");

  try {
    await addDoc(feedbackRef, {
      name: name.value,
      email: email.value,
      saved: "not-yet",
      feedback: feedback.value,
      submittedAt: new Date(),
    });
    submitted.value = true;
  } catch (error) {
    console.error("Error submitting feedback: ", error);
  }
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
  font-weight: 400;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
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
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 1rem;
      box-shadow: none;
    }
    .feedback-form,
    .feedback-success {
      padding: 1rem;
      gap: 7vh;
      display: flex;
      flex-direction: column;
    }
    label {
      font-weight: 600;
    }

    .feedback-form {
      box-shadow: none;
    }
    form {
      gap: 4vh;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    h4 {
      font-size: 0.8rem;
      font-weight: 400;
    }

    .button-container {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      color: white;
      width: 80%;
    }
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

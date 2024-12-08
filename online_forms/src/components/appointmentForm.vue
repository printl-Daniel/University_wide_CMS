<template>
  <div class="appointment-container container-fluid">
    <form @submit.prevent="submitForm">
      <div class="left-column">
        <div class="first-row">
          <div class="form-group">
            <label for="name"
              >Full Name <span class="required-indicator">*</span></label
            >
            <div class="input-icon">
              <i class="fas fa-user"></i>
              <input
                v-model="appointment.name"
                type="text"
                id="name"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="phone"
              >Phone Number <span class="required-indicator">*</span></label
            >
            <div class="input-icon">
              <i class="fas fa-phone"></i>
              <input
                v-model="appointment.phone"
                type="tel"
                id="phone"
                required
              />
            </div>
          </div>

          <div class="form-group email-group">
            <div class="input-with-button">
              <label for="email">
                Email Address
                <span class="required-indicator">
                  *
                  <p class="sign-in-message" v-if="!user">
                    Please sign in using the "Login with Google" button to fill
                    this field.
                  </p>
                </span>
              </label>
              <div class="input-icon">
                <i class="fas fa-envelope"></i>
                <input
                  v-model="appointment.email"
                  type="email"
                  id="email"
                  required
                  readonly
                />
              </div>
            </div>
            <button
              type="button"
              class="email-button"
              @click="googleLogin"
              :disabled="loading || user"
            >
              <span v-if="!loading && !user" class="state-login">
                Login with Google
              </span>
              <span v-else-if="loading" class="state-logging-in">
                <i class="spinner"></i> Logging in...
              </span>
              <span v-else-if="user" class="state-logged-in">Logged In </span>
            </button>
          </div>

          <div class="second-row">
            <div class="form-group">
              <label for="date"
                >Preferred Date <span class="required-indicator">*</span></label
              >
              <div class="input-icon">
                <i class="fas fa-calendar"></i>
                <input
                  v-model="appointment.date"
                  type="date"
                  id="date"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="time"
                >Preferred Time <span class="required-indicator">*</span></label
              >
              <div class="input-icon">
                <i class="fas fa-clock"></i>
                <input
                  v-model="appointment.time"
                  type="time"
                  id="time"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-column">
        <div class="form-group">
          <label for="appointmentType"
            >Appointment Type <span class="required-indicator">*</span></label
          >
          <div class="input-icon">
            <i class="fas fa-clipboard"></i>
            <select
              v-model="appointment.appointmentType"
              id="appointmentType"
              required
            >
              <option value="Dental">Dental</option>
              <option value="Consultation">Consultation</option>
              <option value="Medical Certificate">
                Issue Medical Certificate
              </option>
              <option value="Check-up">Check-up</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Your Campus <span class="required-indicator">*</span></label>
          <div class="campus-options">
            <label class="campus-option">
              <input
                type="radio"
                v-model="appointment.campus"
                value="Main"
                required
              />
              <span>Main Campus</span>
            </label>
            <label class="campus-option">
              <input
                type="radio"
                v-model="appointment.campus"
                value="Calapan"
                required
              />
              <span>Calapan Campus</span>
            </label>
            <label class="campus-option">
              <input
                type="radio"
                v-model="appointment.campus"
                value="Bongabong"
                required
              />
              <span>Bongabong Campus</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="notes">Additional Notes</label>
          <textarea
            v-model="appointment.notes"
            id="notes"
            rows="3"
            placeholder="Any special requests or information we should know?"
          ></textarea>
        </div>
        <button type="submit" class="submit-button">
          <i class="fas fa-calendar-plus"></i>
          Book Appointment
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import firebase from "../firebase";
const { db } = firebase;

const appointment = ref({
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  notes: "",
  status: "Pending",
  appointmentType: "Dental",
  campus: "",
});

const errors = ref({});
const user = ref(null);
const loading = ref(false);
const error = ref(null);

const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  loading.value = true;
  error.value = null;

  try {
    const result = await signInWithPopup(getAuth(), provider);
    const userCredential = result.user;
    user.value = userCredential;
    appointment.value.email = userCredential.email;
  } catch (err) {
    error.value = "Failed to log in. Please try again.";
    console.error("Error during Google login:", err.message);
  } finally {
    loading.value = false;
  }
};

const validateForm = () => {
  errors.value = {};

  if (!appointment.value.name) errors.value.name = "Full Name is required.";
  if (!appointment.value.phone)
    errors.value.phone = "Phone Number is required.";
  if (!appointment.value.email)
    errors.value.email = "Email Address is required.";
  if (!appointment.value.date)
    errors.value.date = "Preferred Date is required.";
  if (!appointment.value.time)
    errors.value.time = "Preferred Time is required.";
  if (!appointment.value.appointmentType)
    errors.value.appointmentType = "Appointment Type is required.";
  if (!appointment.value.campus)
    errors.value.campus = "Campus selection is required.";

  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) {
    const errorMessages = Object.entries(errors.value)
      .map(([field, message]) => `- ${message}`)
      .join("\n");
    alert(`${errorMessages}`);
    return;
  }

  try {
    const colRef = collection(db, "appointments");
    await addDoc(colRef, {
      ...appointment.value,
      createdAt: new Date(),
    });
    alert("Appointment booked successfully!");
    resetForm();
  } catch (error) {
    console.error("Error creating appointment:", error);
    alert("Failed to create appointment.");
  }
};

const resetForm = () => {
  appointment.value = {
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
    status: "Pending",
    appointmentType: "",
    campus: "",
  };
};
</script>

<style scoped>
form-group.email-group {
  display: flex;
  flex-direction: column;
}

.input-with-button {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.required-indicator {
  color: red;
  margin-left: 0.25rem;
}

.sign-in-message {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}

.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.input-icon input {
  padding-left: 30px;
  width: 100%;
}

.email-button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.email-button:hover:not(:disabled) {
  background-color: #3367d6;
}

.email-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.state-login,
.state-logging-in,
.state-logged-in {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.state-logged-in {
  color: green;
}

.state-logging-in {
  color: rgb(216, 190, 143);
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1vw;
  padding: 2rem;
}

.appointment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85vh;
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  gap: 5vh;
  width: 50%;
  height: 50%;
  padding: 4.3rem;
}

.right-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2vh;
  margin-left: 1vw;
  height: 100%;
  width: 20%;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.first-row {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2vw;
  justify-content: center;
  border: 1px;
}

.second-row {
  display: flex;
  width: 100%;
  justify-content: start;
  gap: 4vw;
  align-items: center;
}

.campus-option {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.campus-option:hover {
  background-color: #f3f4f6;
}

.campus-option input[type="radio"] {
  margin-right: 0.5rem;
}

.submit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102%;
  padding: 0.75rem 1rem;
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  border: 1px solid;
}

.submit-button:hover {
  background-color: #2563eb;
}

.submit-button i {
  margin-right: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
input[type="time"],
select,
textarea {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"] {
  width: 80%;
  padding: 0.8rem 2rem;
}

input[type="time"] {
  width: 80%;
  padding: 0.7rem 2rem;
}

select,
textarea,
.campus-option {
  padding: 0.8rem 2rem;
  width: 80%;
}

#appointmentType {
  width: 91%;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #9ca3af;
}

@media (max-width: 768px) {
  body {
    overflow-x: none;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  form {
    flex-direction: column;
    padding: 0;
  }

  .appointment-container {
    height: auto;
    padding: 1rem;
  }

  .right-column {
    width: 100%;
    box-shadow: none;
    padding: 0;
  }

  .left-column {
    width: 100%;
    padding: 0;
  }

  .first-row,
  .second-row {
    flex-direction: column;
  }

  .second-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .submit-button {
    font-size: 0.9rem;
  }

  input[type="date"] {
    width: 71vw;
    padding: 0.8rem 2rem;
  }

  input[type="time"] {
    width: 71vw;
    padding: 0.7rem 2rem;
  }

  textarea {
    width: 72vw;
    padding: 0.8rem 2rem;
  }

  #appointmentType {
    width: 89vw;
  }

  .campus-option {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: row;
  }

  .submit-button {
    width: 90vw;
  }
}
</style>

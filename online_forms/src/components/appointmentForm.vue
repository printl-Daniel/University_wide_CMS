<template>
  <div class="appointment-container container-fluid">
    <form @submit.prevent="submitForm">
      <div class="left-column">
        <div class="first-row">
          <div class="form-group">
            <label for="name">Full Name</label>
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
            <label for="email">Email Address</label>
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
              <input
                v-model="appointment.email"
                type="email"
                id="email"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
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
          <div class="second-row">
            <div class="form-group">
              <label for="date">Preferred Date</label>
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
              <label for="time">Preferred Time</label>
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
          <label for="appointmentType">Appointment Type</label>
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
        <div class="">
          <div class="form-group">
            <label>Your Campus</label>
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
                />
                <span>Calapan Campus</span>
              </label>
              <label class="campus-option">
                <input
                  type="radio"
                  v-model="appointment.campus"
                  value="Bongabong"
                />
                <span>Bongabong Campus</span>
              </label>
            </div>
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
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";
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

const submitted = ref(false);

const submitForm = async () => {
  try {
    const colRef = collection(db, "appointments");
    await addDoc(colRef, {
      ...appointment.value,
      createdAt: new Date(),
    });

    submitted.value = true;
    resetForm();
    alert("Appointment booked successfully!");
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
    appointmentType: "Dental",
    campus: "",
  };
};
</script>

<style scoped>
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
  height: 80vh;
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  gap: 5vh;
  width: 50%;
  height: 100%;
  padding: 4.3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  }
  form {
    flex-direction: column;
    padding: 1rem;
  }

  .appointment-container {
    height: auto;
    padding: 1rem;
  }

  .left-column,
  .right-column {
    width: 100%;
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

fix the sizes

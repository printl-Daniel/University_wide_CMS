<template>
    <div>
      <PatientNavbar />
      <div class="medical-record">
        <!-- Page Title -->
        <h1>My Medical Records</h1>
  
        <!-- Flex Container -->
        <div class="record-container">
          <!-- Diagnosis History -->
          <section class="diagnosis-history">
            <h2>Diagnosis History</h2>
            <div v-if="records.length > 0">
              <div v-for="(record, index) in records" :key="index" class="record-card">
                <p><strong>Date:</strong> {{ record.date }}</p>
                <p><strong>Doctor:</strong> {{ record.doctor }}</p>
                <p><strong>Diagnosis:</strong> {{ record.diagnosis }}</p>
                <button @click="toggleDetails(index)">
                  {{ expandedRecord === index ? "Hide Details" : "View Details" }}
                </button>
  
                <!-- Expandable Details -->
                <div v-if="expandedRecord === index" class="details">
                  <p><strong>Notes:</strong> {{ record.notes }}</p>
                </div>
              </div>
            </div>
            <div v-else>
              <p>No medical records found.</p>
            </div>
          </section>
  
          <!-- Prescription History -->
          <section class="prescriptions">
            <h2>Prescriptions</h2>
            <div v-if="prescriptions.length > 0">
              <ul>
                <li v-for="(prescription, index) in prescriptions" :key="index" class="prescription-card">
                  <p><strong>Medicine:</strong> {{ prescription.medicine }}</p>
                  <p><strong>Dosage:</strong> {{ prescription.dosage }}</p>
                  <p><strong>Duration:</strong> {{ prescription.duration }}</p>
                  <button @click="downloadPrescription(prescription.id)">
                    Download Prescription
                  </button>
                </li>
              </ul>
            </div>
            <div v-else>
              <p>No prescriptions found.</p>
            </div>
          </section>
        </div>
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
        records: [
          // Sample Data
          {
            date: "2024-11-01",
            doctor: "Dr. Smith",
            diagnosis: "Common Cold",
            notes: "Stay hydrated and take the prescribed medicine."
          },
          {
            date: "2024-10-15",
            doctor: "Dr. Jane Doe",
            diagnosis: "Mild Allergies",
            notes: "Avoid allergens and use antihistamines as directed."
          }
        ],
        prescriptions: [
          // Sample Data
          {
            id: 1,
            medicine: "Paracetamol",
            dosage: "500mg, 3x a day",
            duration: "5 days"
          },
          {
            id: 2,
            medicine: "Cetirizine",
            dosage: "10mg, 1x a day",
            duration: "7 days"
          }
        ],
        expandedRecord: null // Tracks which record's details are expanded
      };
    },
    methods: {
      toggleDetails(index) {
        this.expandedRecord = this.expandedRecord === index ? null : index;
      },
      downloadPrescription(id) {
        // Mock download functionality
        alert(`Downloading prescription with ID: ${id}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .medical-record {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .record-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
  }
  
  .diagnosis-history,
  .prescriptions {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
    color: #007bff;
  }
  
  .record-card,
  .prescription-card {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #ffffff;
  }
  
  .details {
    margin-top: 10px;
    background-color: #f0f8ff;
    padding: 10px;
    border-radius: 5px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  
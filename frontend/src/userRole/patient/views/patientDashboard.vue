<template>
    <div>
      <!-- Navbar -->
      <PatientNavbar />
  
      <!-- Dashboard Content -->
      <div class="dashboard-container">
        <h2 class="dashboard-title">Patient Services Dashboard</h2>
  
        <!-- Dashboard Cards Section -->
        <div class="dashboard-cards">
  
          <!-- Request Medical Certificate Section -->
          <div class="card custom-card">
            <div class="card-header custom-card-header">
              <h4>Request a Medical Certificate</h4>
            </div>
            <div class="card-body">
              <p>No certificates requested yet. Start your request now.</p>
              <button class="btn custom-btn">Request Now</button>
            </div>
          </div>
  
          <!-- Submit Feedback Section -->
          <div class="card custom-card">
            <div class="card-header custom-card-header">
              <h4>Provide Feedback</h4>
            </div>
            <div class="card-body">
              <p>Your feedback helps us improve! Share your experience.</p>
              <button class="btn custom-btn">Give Feedback</button>
            </div>
          </div>
  
          <!-- Recent Activities Section -->
          <div class="card custom-card">
            <div class="card-header custom-card-header">
              <h4>Recent Activities</h4>
            </div>
            <div class="card-body">
              <p>No recent activities to display yet. Check back soon!</p>
              <button class="btn custom-btn">View History</button>
            </div>
          </div>
  
          <!-- Notifications Section -->
          <div class="card custom-card">
            <div class="card-header custom-card-header">
              <h4>Notifications</h4>
            </div>
            <div class="card-body">
              <p>No new notifications at the moment.</p>
              <button class="btn custom-btn">View All</button>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PatientNavbar from '../components/patientNavbar.vue';
  
  export default {
    components: {
      PatientNavbar
    }
  };
  </script>
  
  <style scoped>
  /* Container Styling */
  .dashboard-container {
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9; /* Soft background */
    min-height: 100vh;
  }
  
  .dashboard-title {
    font-size: 1.8rem;
    color: #2e7d32; /* Consistent green */
    text-align: center;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  /* Card Grid Container */
  .dashboard-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }
  
  /* Card Styling */
  .custom-card {
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
  }
  
  .custom-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  /* Card Header */
  .custom-card-header {
    background-color: #2e7d32;
    color: white;
    padding: 12px 15px;
    font-size: 1.2rem;
    text-align: center;
  }
  
  /* Card Body */
  .card-body {
    padding: 15px;
    font-size: 1rem;
    color: #333;
    text-align: center;
  }
  
  /* Button Styling */
  .btn {
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #2e7d32;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  .btn:hover {
    background-color: #276628;
  }
  
  .custom-btn {
    background-color: #2e7d32;
  }
  
  .custom-btn:hover {
    background-color: #276628;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .dashboard-title {
      font-size: 1.5rem;
    }
  }
  </style>
  
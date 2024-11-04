<template>
    <div class="sidebar">
      <a href="/" class="logo">
        <span class="logo-text">Clinic Management</span>
      </a>
      <hr>
      <ul class="nav">
        <li class="nav-item">
          <a href="/doctor/dashboard" class="nav-link active">Dashboard</a>
        </li>
        <li>
          <a href="/doctor/patients" class="nav-link">Patients</a>
        </li>
        <li>
          <a href="/doctor/appointments" class="nav-link">Appointments</a>
        </li>
        <li>
          <a href="/doctor/medical-history" class="nav-link">Medical History</a>
        </li>
        <li>
          <a href="/doctor/feedback" class="nav-link">Feedback</a>
        </li>
        <li>
          <a href="/doctor/settings" class="nav-link">Settings</a>
        </li>
      </ul>
      <hr>
      <div class="dropdown">
        <a href="#" class="dropdown-toggle" id="dropdownUser2" @click="toggleDropdown">
          <img src="https://via.placeholder.com/30" alt="" class="profile-img">
          <strong>Bautista</strong>
        </a>
        <ul class="dropdown-menu" v-if="dropdownOpen">
          <li><a class="dropdown-item" href="/doctor/profile">Profile</a></li>
          <li><a class="dropdown-item" href="/logout">Sign out</a></li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DoctorSidebar",
    data() {
      return {
        dropdownOpen: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    background-color: #dae2d9; /* Light gray background */
    height: 100vh;
    width: 250px;
    padding: 20px;
  }
  
  .logo {
    text-decoration: none;
  }
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #007bff; /* Primary color */
  }
  
  hr {
    margin: 10px 0;
  }
  
  .nav {
    list-style-type: none;
    padding: 0;
  }
  
  .nav-item {
    margin: 10px 0;
  }
  
  .nav-link {
    text-decoration: none;
    color: #333; /* Dark text color */
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .nav-link.active,
  .nav-link:hover {
    background-color: #007bff; /* Highlight color */
    color: white; /* White text on highlight */
  }
  
  .dropdown {
    position: relative;
  }
  
  .dropdown-toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .profile-img {
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .dropdown-menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    list-style: none;
    padding: 0;
    margin-top: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  .dropdown-menu .dropdown-item {
    text-decoration: none;
    color: #333; /* Dark text color */
    padding: 10px;
    display: block;
  }
  
  .dropdown-menu .dropdown-item:hover {
    background-color: #007bff; /* Highlight color */
    color: white; /* White text on highlight */
  }
  </style>
  
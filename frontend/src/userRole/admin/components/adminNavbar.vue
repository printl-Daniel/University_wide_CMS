<template>
    <header class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Clinic</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/inventory">Inventory</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/view-user">Manage User</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/feedback">Feedback & Evaluation</router-link>
            </li>     
          </ul>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    mounted() {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/css/navbar.css'; 
      document.head.appendChild(link);
    },
  };
  </script>
  
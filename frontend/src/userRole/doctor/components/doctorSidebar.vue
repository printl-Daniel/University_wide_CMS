
<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h3>Clinic</h3>
    </div>

    <ul class="nav flex-column p-3">
      <li class="nav-item">
        <router-link class="nav-link" to="">Dashboard</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="">Patients</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="">Medical History</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="">Settings</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  mounted() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/sidebar.css'; 
    document.head.appendChild(link);
  },
};
</script>

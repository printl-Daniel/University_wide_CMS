<template>
  <div class="sidebar">
    <h2>Staff Navigation</h2>
    <ul>
      <li><router-link to="/staff/dashboard">Dashboard</router-link></li>
      <li><router-link to="/staff/inventory">Manage Inventory</router-link></li>
      <li><router-link to="/staff/patient-list">View Patient List</router-link></li>
      <li><router-link to="/staff/reports">Generate Reports</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "StaffSidebar",
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #343a40;
  color: #ffffff;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
}

.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  text-align: center;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  color: #ffffff;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display: block;
}

.sidebar ul li a:hover {
  background-color: #007bff;
  color: #ffffff;
}
</style>

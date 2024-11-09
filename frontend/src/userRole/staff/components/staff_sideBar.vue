<template>
  <div class="wrapper">

    <aside id="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="h-100">
        <div class="sidebar-logo">
          <a href="#">University CMS</a>
        </div>

        <ul class="sidebar-nav">
          <li class="sidebar-header">Modules</li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-list pe-2"></i>
              Dashboard
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link collapsed" @click="toggleSubmenu('records')">
              <i class="fa-regular fa-file-lines pe-2"></i>
              Records
            </a>
            <ul v-if="submenus.records" class="sidebar-dropdown list-unstyled">
              <li class="sidebar-item">
                <router-link to="/staff/student-records" class="sidebar-link">Student Records</router-link>
              </li>
              <li class="sidebar-item">
                <router-link to="/staff/staff-records" class="sidebar-link">Staff Records</router-link>
              </li>
              <li class="sidebar-item">
                <router-link to="/staff/feedback-evaluations" class="sidebar-link">Feedback Evaluations</router-link>
              </li>
            </ul>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link collapsed" @click="toggleSubmenu('reports')">
              <i class="fa-solid fa-chart-line pe-2"></i>
              Reports
            </a>
            <ul v-if="submenus.reports" class="sidebar-dropdown list-unstyled">
              <li class="sidebar-item">
                <router-link to="/staff/monthly-reports" class="sidebar-link">Monthly Reports</router-link>
              </li>
              <li class="sidebar-item">
                <router-link to="/staff/annual-reports" class="sidebar-link">Annual Reports</router-link>
              </li>
            </ul>
          </li>
          <li class="sidebar-header">Staff Navigation</li>
          <li class="sidebar-item">
            <router-link to="/staff/dashboard" class="sidebar-link">Dashboard</router-link>
          </li>
          <li class="sidebar-item">
            <router-link to="/staff/inventory" class="sidebar-link">Manage Inventory</router-link>
          </li>
          <li class="sidebar-item">
            <router-link to="/staff/patient-list" class="sidebar-link">View Patient List</router-link>
          </li>
          <li class="sidebar-item">
            <router-link to="/staff/reports" class="sidebar-link">Generate Reports</router-link>
          </li>
        </ul>
      </div>
    </aside>
    <!-- Main Component -->
    <div class="main">
      <nav class="navbar navbar-expand px-3 border-bottom">
        
        <!-- Button for sidebar toggle -->
        <button class="btn" type="button" @click="toggleSidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <header class="header">
      <h3>University CMS</h3>
    </header>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      submenus: {
        records: false,
        reports: false,
      }
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleSubmenu(menu) {
      this.submenus[menu] = !this.submenus[menu];
    },
  },
};
</script>

<style scoped>
.wrapper {
  align-items: stretch;
  display: flex;
  width: 100%;
}

#sidebar {
  max-width: 264px;
  min-width: 264px;
  background-color: #343a40; /* Sidebar background */
  color: #adb5bd; /* Darker text color */
  transition: all 0.35s ease-in-out;
  box-shadow: 0 0 35px 0 rgba(49, 57, 66, 0.5);
  z-index: 1111;
}

#sidebar.collapsed {
  margin-left: -264px;
}

.sidebar-logo {
  padding: 1.15rem 1.5rem;
}

.sidebar-logo a {
  color: #f8f9fa;
  font-size: 1.25rem;
  font-weight: 600;
}

.sidebar-nav {
  padding: 0;
}

.sidebar-header {
  color: #ced4da;
  font-size: 0.75rem;
  padding: 1.5rem 1.5rem 0.375rem;
  text-transform: uppercase;
}

a.sidebar-link {
  padding: 0.625rem 1.625rem;
  color: #adb5bd; /* Darker text color */
  position: relative;
  display: block;
  font-size: 1rem;
  transition: color 0.3s, background-color 0.3s;
}

a.sidebar-link:hover, a.sidebar-link:focus {
  color: #f8f9fa; /* Slightly lighter on hover */
  background-color: #495057; /* Darker background on hover */
}

.sidebar-link.collapsed::after {
  border: solid;
  border-width: 0 0.075rem 0.075rem 0;
  content: "";
  display: inline-block;
  padding: 2px;
  position: absolute;
  right: 1.5rem;
  top: 1.4rem;
  transform: rotate(-135deg);
  transition: all 0.2s ease-out;
}

.sidebar-link.collapsed + .sidebar-dropdown {
  display: none;
}

.sidebar-dropdown .sidebar-item .sidebar-link {
  padding-left: 2.5rem;
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  transition: all 0.35s ease-in-out;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  color: #adb5bd;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  display: block;
}

.sidebar ul li a:hover {
  background-color: #495057;
  color: #f8f9fa;
}
</style>


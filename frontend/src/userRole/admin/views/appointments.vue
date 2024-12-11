<template>
  <div>
    <!-- TopNav-->
    <div class="header">
      <TopNav />
    </div>
    <!-- Dashboard Content -->
    <div class="page-content">
      <div class="sidebar">
        <SideNav />
      </div>
      <div class="content">
        <div id="tab">
          <div class="tabs">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              :class="{ active: selectedTab === index }"
              @click="changeTab(index)"
            >
              {{ tab.name }}
            </button>
          </div>
          <div class="tab-content">
            <pendingTable v-if="selectedTab === 0" />
            <approvedTable v-if="selectedTab === 1" />
            <declinedTable v-if="selectedTab === 2" />
            <afterAppointedTable v-if="selectedTab === 3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pendingTable from "../components/pendingTable.vue";
import approvedTable from "../components/approvedTable.vue";
import declinedTable from "../components/declinedTable.vue";
import afterAppointedTable from "../components/afterAppointedTable.vue";
import SideNav from "../components/sideNav.vue";
import TopNav from "../components/topNav.vue";

export default {
  components: {
    pendingTable,
    approvedTable,
    declinedTable,
    afterAppointedTable,
    SideNav,
    TopNav,
  },
  data() {
    return {
      tabs: [
        { name: "Pending" },
        { name: "Approved" },
        { name: "Declined" },
        { name: "Appointment Outcomes" },
      ],
      selectedTab: 0,
    };
  },
  methods: {
    changeTab(index) {
      this.selectedTab = index;
    },
  },
};
</script>

<style scoped>
.page-content {
  display: flex;
}
.tabs {
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
}
.content {
  padding: 1rem;
  width: 100%;
  height: 80vh;
}
.tab-content {
  padding: 1rem;
}

.tabs button {
  padding: 12px 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: #757575;
  transition: all 0.3s ease;
  position: relative;
}

.tabs button:hover {
  color: #91dfa2;
}

.tabs button.active {
  color: #4cca67;
}

.tabs button.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #91dfa2;
}
</style>

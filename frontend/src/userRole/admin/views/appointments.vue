<template>
  <div>
    <!-- TopNav-->
    <div class="header">
      <TopNav />
    </div>
    <!-- Dashboard Content -->
    <div class="page-content">
      <div class="sidebar"><SideNav /></div>
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
.tabs button.active {
  background-color: #007bff;
  color: white;
}
</style>

<template>
  <div>
    <!-- TopNav -->
    <div class="header">
      <TopNav />
    </div>
    <!-- Dashboard Content -->
    <div class="page-content">
      <!-- Side Navigation -->
      <div class="sidebar">
        <SideNav />
      </div>
      <!-- Main Content -->
      <div class="content">
        <Feedback />
      </div>
    </div>
  </div>
</template>

<script>
import Feedback from "../components/feedback.vue";
import SideNav from "../components/sideNav.vue";
import TopNav from "../components/topNav.vue";

export default {
  components: {
    Feedback,
    SideNav,
    TopNav,
  },
};
</script>

<style scoped>
/* General Layout */
.page-content {
  display: flex; /* Enable flexbox layout */
  font-family: "Poppins", serif;
  font-weight: 300;
  font-style: normal;
  height: 92vh;
}

/* Content Area */
.content {
  flex: 1; /* Take the remaining space */
  padding: 1rem;
  background-color: #ffffff;
}
</style>

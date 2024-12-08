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
.tabs button.active {
  background-color: #007bff;
  color: white;
}
</style>

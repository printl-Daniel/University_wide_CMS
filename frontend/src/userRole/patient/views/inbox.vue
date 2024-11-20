<template>
  <div>
    <div class="header">
      <TopNav />
    </div>
    <!-- Dashboard Content -->
    <div class="page-content">
      <div class="sidebar"><SideNav /></div>
      <div class="content"></div>
    </div>
  </div>
</template>
<script>
import TopNav from "../components/topNav.vue";
import SideNav from "../components/sideNav.vue";
export default {
  components: {
    TopNav,
    SideNav,
  },
};
</script>

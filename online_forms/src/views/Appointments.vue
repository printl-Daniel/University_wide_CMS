<template>
  <div class="topNav">
    <TopNav />
  </div>
  <div class="content">
    <div>
      <AppointmentForm />
    </div>
  </div>
</template>

<script>
import AppointmentForm from "../components/appointmentForm.vue";
import TopNav from "../components/topNav.vue";

export default {
  components: {
    AppointmentForm,
    TopNav,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}
</style>

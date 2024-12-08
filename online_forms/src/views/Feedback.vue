<template>
  <div class="topNav">
    <TopNav />
  </div>
  <div class="content">
    <div>
      <FeedbackForm />
    </div>
  </div>
</template>

<script>
import FeedbackForm from "../components/feedback.vue";
import TopNav from "../components/topNavFeedback.vue";

export default {
  components: {
    FeedbackForm,
    TopNav,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", serif;
  font-weight: 300;
  font-style: normal;
}
</style>

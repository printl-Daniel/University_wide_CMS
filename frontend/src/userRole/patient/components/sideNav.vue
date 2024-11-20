<template>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"
      integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div class="side-nav">
      <button class="compose-btn" @click="goTo('/patient/senMail')">
        <i class="fa-solid fa-pencil"></i>Compose
      </button>
      <div class="nav-items">
        <router-link
          class="certificate"
          :class="{ active: isActive('/patient/inbox') }"
          to="/patient/inbox"
        >
          <i class="fa-regular fa-envelope"></i> Inbox
        </router-link>
        <router-link
          class="certificate"
          :class="{ active: isActive('/sent') }"
          to="/sent"
        >
          <i class="fa-solid fa-paper-plane"></i> Sent
        </router-link>
        <router-link
          class="certificate"
          :class="{ active: isActive('/medical-certificate') }"
          to="/medical-certificate"
        >
          <i class="fa-solid fa-scroll"></i> Medical Certificate
        </router-link>
        <router-link
          class="certificate"
          :class="{ active: isActive('/doctors-note') }"
          to="/doctors-note"
        >
          <i class="fa-solid fa-note-sticky"></i> Doctor's Note
        </router-link>
        <router-link
          class="certificate"
          :class="{ active: isActive('/history') }"
          to="/history"
        >
          <i class="fa-solid fa-clock-rotate-left"></i> History
        </router-link>
      </div>
    </div>
  </body>
</template>
<script>
export default {
  name: "sideNav",
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    isActive(path) {
      return this.$route.path === path;
    },
  },
  mounted() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/nav.css";
    document.head.appendChild(link);
  },
};
</script>

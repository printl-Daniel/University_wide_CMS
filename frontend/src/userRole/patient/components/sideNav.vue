<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inbox Table</title>
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
          :class="{ active: isActive('/patient/sent') }"
          to="/patient/sent"
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

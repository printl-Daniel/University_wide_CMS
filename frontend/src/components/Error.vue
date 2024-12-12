<template>
    <div class="error">
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <router-link to="/">Go to Login</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "ErrorPage",
  };
  </script>
  
  <style scoped>
  .error {
    text-align: center;
    margin-top: 50px;
  }
  </style>
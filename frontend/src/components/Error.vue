<template>
  <div class="error">
    <h1>Access Denied</h1>
    <p>You do not have permission to access this page.</p>
    <router-link to="/" class="login-button">Go to Login</router-link>
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
  color: #333;
  padding: 20px;
  border-radius: 5px;
}

.login-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
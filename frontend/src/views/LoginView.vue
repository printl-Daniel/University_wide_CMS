<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label>Username:</label>
          <input v-model="username" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        error: null,
      };
    },
    methods: {
      handleLogin() {
        const validUsername = "user";
        const validPassword = "password";
  
        if (this.username === validUsername && this.password === validPassword) {
          this.$router.push("/home");
        } else {
          this.error = "Invalid username or password";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
  }
  </style>
  
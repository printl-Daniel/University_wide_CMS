<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label>Username</label>
        <input v-model="username" placeholder="Enter username" required />
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Enter password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
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
  max-width: 400px;
  margin: 10% auto;
  padding: 20px;
  text-align: center;
  border: 1px solid;
  border-radius: 20px;
  
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
}
</style>

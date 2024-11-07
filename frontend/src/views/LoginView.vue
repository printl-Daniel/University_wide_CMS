<template>
  <v-app>
    <v-container
      fluid
      class="fill-height d-flex align-center justify-center"
    >
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="headline">Login</v-card-title>
            <v-card-subtitle>Enter your credentials</v-card-subtitle>

            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- Username Field -->
              <v-text-field
                v-model="username"
                label="Username"
                :rules="[usernameRules]"
                required
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="password"
                label="Password"
                :rules="[passwordRules]"
                required
                type="password"
              ></v-text-field>

              <!-- Login Button -->
              <v-btn :disabled="!valid" color="primary" @click="login">
                Login
              </v-btn>
            </v-form>

            <v-alert
              v-if="errorMessage"
              type="error"
              dismissible
              class="mt-4"
            >
              {{ errorMessage }}
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      valid: false,
      errorMessage: "",
      // Rules for username validation
      usernameRules: [
        (v) => !!v || "Username is required",
      ],
      // Rules for password validation
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
    };
  },
  methods: {
    // Login function
    async login() {
      try {
        // Sending POST request to backend with username and password
        const response = await axios.post("http://localhost:3000/api/login", {
          username: this.username,
          password: this.password,
        });

        if (response.status === 200) {

          localStorage.setItem("username", response.data.username);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("userID", response.data.userID);

          // Redirect based on role
          if (response.data.role === "admin") {
            this.$router.push("/admin/dashboard");
          } else (response.data.role === "staff") {
            this.$router.push("/staff/dashboard");
          } 
        }
      } catch (error) {
        // Handle error if login fails
        console.error("Login error:", error);
        this.errorMessage = error.response.data.errorMessage || "Login failed. Please try again.";
      }
    },
  },
};

</script>


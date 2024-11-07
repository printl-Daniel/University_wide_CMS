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
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[emailRules]"
                required
                type="email"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :rules="[passwordRules]"
                required
                type="password"
              ></v-text-field>

              <v-btn :disabled="!valid" color="primary" @click="login">
                Login
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
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


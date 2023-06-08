<template>
  <v-container fluid fill-height class="pa-16 gradient-container" style="height: 100vh;">
    <v-row class="d-flex align-center justify-center" style="height: 100%;">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto px-6 py-8 rounded-lg" max-width="400" elevation="12">
          <v-img src="@/assets/images/hydroponic.png" class="mx-auto" :width="100" height="100" contain>
          </v-img>
          <v-card-title class="text-center py-12">
            <h2 class="text-h4">Welcome</h2>
          </v-card-title>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
              label="Email"></v-text-field>
            <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
              placeholder="Enter your password"></v-text-field>
            <br>
            <v-btn :disabled="!form" :loading="loading" block color="indigo" size="large" type="submit"
              variant="elevated">
              Log in
            </v-btn>
            <div class="text-right mt-2">
              <v-btn class="transparent-btn text-indigo" elevation="0">
                <p class="text-capitalize">Forgot your password?</p>
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { isAuthenticated, login, logout } from '@/scripts/auth.js'

export default {
  name: "SignIn",
  data() {
    return {
      form: false,
      email: "",
      password: "",
      loading: false,
    }
  },
  created() {
    const token = localStorage.getItem('token')
    const expiration = localStorage.getItem('expiration')

    if (token && expiration) {
      const currentTime = new Date().getTime()
      if (currentTime < parseInt(expiration)) {
        if (!isAuthenticated()) {
          login()
        }
        router.push('/')
      } else {
        logout()
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
      }
    }
  },
  methods: {
    signin() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log(userCredential);
          this.loading = false;
          login();

          const user = userCredential.user;
          user.getIdToken()
            .then((token) => {
              const expiration = new Date().getTime() + 3600 * 1000;
              localStorage.setItem('token', token);
              localStorage.setItem('expiration', expiration);

              router.push('/');
            })
            .catch((error) => {
              console.log(error);
              // Lida com erros ao obter o token
            });
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
    onSubmit() {
      if (!this.form) return

      this.loading = true
      this.signin()
    },
    required(v) {
      return !!v || 'Field is required'
    },
  }
}
</script>

<style>
.gradient-container {
  background: linear-gradient(to bottom, #004d40, #002b27);
}
</style>
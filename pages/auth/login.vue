<template>
<v-layout>
<v-container class="mt-10">
      <v-row class="justify-center">
        <v-col cols="12" md="6">
          <v-card elevation="2" > 
            <v-card-title class="display-1">Login</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
              <v-form @submit.prevent="authenticateUser">
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="fields.username"
                      prepend-inner-icon="mdi-account"
                      label="Username"
                      placeholder="Username"
                      solo
                    ></v-text-field>
                    <div class="text-left caption" v-for="(error,index) in errors.username" :key="index">
                      <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="fields.password"
                      prepend-inner-icon="mdi-lock"
                      label="Password"
                      placeholder="Password"
                      solo
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPass ? 'text' : 'password'"
                      @click:append="showPass = !showPass"
                    ></v-text-field>
                    <div class="text-left caption" v-for="(error,index) in errors.password" :key="index">
                      <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                      class="pt-0 text-left"
                    >
                      <span class="red--text">Need an account ? </span><nuxt-link to="/auth/register"><v-btn rounded x-small color="primary">Register</v-btn></nuxt-link>
                    </v-col>
                  </v-row>
                  <v-btn
                    rounded
                    large
                    color="primary"
                    type="submit"
                  >
                    Login
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
</v-container>
</v-layout>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  middleware: 'unauthenticated',
  data() {
    return {
      fields: {
        username: '',
        password: ''
      },
      showPass: false
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'auth/loginUser', refreshError: 'auth/refreshError'
    }),
    async authenticateUser() {
      await this.loginUser(this.fields);
    }
  },
  computed: {
    errors () {
      return this.$store.state.auth.errors
    }
  },
  created(){
    return this.refreshError();
  }
}
</script>

<style>
  
</style>
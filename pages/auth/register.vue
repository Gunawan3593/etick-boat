<template>
<v-container>
    <v-layout>
      <v-row class="justify-center">
        <v-col cols="12" md="6">
        <v-card elevation="2" > 
          <v-card-title class="display-1">Register</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <v-form @submit.prevent="signUpUser">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fields.firstName"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    label="First Name"
                    placeholder="First Name"
                    solo
                  ></v-text-field>
                  <div class="text-left caption" v-for="(error,index) in errors.firstName" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fields.lastName"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    label="Last Name"
                    placeholder="Last Name"
                    solo
                  ></v-text-field>
                  <div class="text-left caption" v-for="(error,index) in errors.lastName" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-menu
                    :close-on-content-click="true"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="fields.birthDate"
                        label="Birth Date"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        solo
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fields.birthDate"
                    ></v-date-picker>
                  </v-menu>
                  <div class="text-left caption" v-for="(error,index) in errors.birthDate" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="fields.gender"
                    :items="genders"
                    item-text="desc"
                    item-value="id"
                    label="Gender"
                    return-object
                    solo
                  ></v-select>
                  <div class="text-left caption" v-for="(error,index) in errors.gender" :key="index">
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
                    v-model="fields.email"
                    prepend-inner-icon="mdi-email"
                    label="Email"
                    placeholder="Email"
                    solo
                  ></v-text-field>
                  <div class="text-left caption" v-for="(error,index) in errors.email" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-textarea
                    v-model="fields.address"
                    prepend-inner-icon="mdi-map-marker"
                    solo
                    name="input-7-4"
                    label="Address"
                    placeholder="Address"
                  ></v-textarea>
                  <div class="text-left caption" v-for="(error,index) in errors.address" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fields.city"
                    prepend-inner-icon="mdi-city"
                    label="City"
                    placeholder="City"
                    solo
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fields.province"
                    prepend-inner-icon="mdi-island"
                    label="Province"
                    placeholder="Province"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fields.state"
                    prepend-inner-icon="mdi-earth"
                    label="State"
                    placeholder="State"
                    solo
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fields.postCode"
                    prepend-inner-icon="mdi-post"
                    label="Post Code"
                    placeholder="Post Code"
                    solo
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fields.phone"
                    prepend-inner-icon="mdi-phone"
                    label="Phone"
                    placeholder="Phone"
                    solo
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
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
                  md="6"
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
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fields.cPassword"
                    prepend-inner-icon="mdi-lock"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    solo
                    :append-icon="showcPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showcPass ? 'text' : 'password'"
                    @click:append="showcPass = !showcPass"
                  ></v-text-field>
                  <div class="text-left caption" v-for="(error,index) in errors.cPassword" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                    class="text-left"
                  >
                    <span class="red--text">Already have account ? </span><nuxt-link to="/auth/login"><v-btn rounded x-small color="primary">Login</v-btn></nuxt-link>
                  </v-col>
                </v-row>
                <v-btn
                  rounded
                  large
                  color="primary"
                  type="submit"
                >
                  Register
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
        </v-col>
      </v-row>
    </v-layout>
</v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  middleware: 'unauthenticated',
  data() {
    return {
      fields: {
        firstName: '',
        lastName: '',
        birthDate: new Date().toISOString().substr(0, 10),
        address: '',
        city: '',
        province: '',
        state: '',
        postCode: '',
        phone: '',
        username: '',
        password: '',
        cPassword: '',
        email: '',
        gender: 0
      },
      genders: [{ id: 1, desc: 'Male'}, { id: 0, desc: 'Female'}, { id: 3, desc: 'Other'} ],
      showPass: false,
      showcPass: false
    }
  },
  head() {
    return {
      titleTemplate: '%s : Register',
    }
  },
  methods: {
    ...mapActions({
      registerUser : 'auth/registerUser', refreshError: 'auth/refreshError'
    }),
    signUpUser() {
      this.registerUser(this.fields);
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
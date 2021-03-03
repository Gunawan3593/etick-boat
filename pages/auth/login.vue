<template>
<v-container>
    <v-layout>
      <v-row class="justify-center">
        <v-col cols="12" md="6">
          <v-card elevation="2" > 
            <v-card-title class="display-1">Login</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
              <v-form>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      prepend-inner-icon="mdi-account"
                      label="Username"
                      placeholder="Username"
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      prepend-inner-icon="mdi-lock"
                      label="Password"
                      placeholder="Password"
                      solo
                    ></v-text-field>
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
                  >
                    Login
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
export default {
  
}
</script>

<style>

</style>
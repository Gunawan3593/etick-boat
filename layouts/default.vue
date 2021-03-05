<template>
  <v-app>
    <v-main>
    <v-toolbar color="green" dark>
    <v-toolbar-title>etick-boat</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text>
      <nuxt-link to="/">
        Home
      </nuxt-link>
    </v-btn>
    <v-btn text>
      <nuxt-link to="/auth/login">
        Login
      </nuxt-link>
    </v-btn>
    <v-btn text>
      <nuxt-link to="/about">
        About
      </nuxt-link>
    </v-btn>
    </v-toolbar>
    <Nuxt />
    </v-main>
  </v-app>
</template>

<style>
a {
  text-decoration: none;
  color: white !important;
}
.swal2-popup {
    font-family: "Roboto", sans-serif !important;
  }
</style>

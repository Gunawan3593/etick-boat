<template>
  <v-app>
    <v-main>
    <v-toolbar color="green" dark>
    <v-toolbar-title>etick-boat</v-toolbar-title>
    <v-toolbar-items v-if="isAuth"><span class="caption pl-1 pt-1"> Hallo {{ user.firstName }} <v-icon small>mdi-emoticon-happy-outline</v-icon></span> </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn text>
      <nuxt-link to="/">
        Home
      </nuxt-link>
    </v-btn>
    <v-menu
      open-on-hover
      bottom
      offset-y
      v-if="isAuth"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          dark
          v-bind="attrs"
          v-on="on"
        >
          Admin
        <v-icon small class="pb-1">mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list nav dense>
        <nuxt-link to="/dashboard">
          <v-list-item link>
            <v-list-item-title>
              Dashboard
            </v-list-item-title>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/admin/vendor">
          <v-list-item link>
            <v-list-item-title>
              Vendor
            </v-list-item-title>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/bank">
          <v-list-item link>
            <v-list-item-title>
              Banking
            </v-list-item-title>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/pricing">
          <v-list-item link>
            <v-list-item-title>
              Pricing
            </v-list-item-title>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/booking">
          <v-list-item link>
            <v-list-item-title>
              Booking
            </v-list-item-title>
          </v-list-item>
        </nuxt-link>
      </v-list>
    </v-menu>
    <v-btn text v-if="isAuth">
      <nuxt-link to="/about">
        About
      </nuxt-link>
    </v-btn>
    <v-btn text v-if="!isAuth">
      <nuxt-link to="/auth/login">
        Login
      </nuxt-link>
    </v-btn>
    <v-btn text @click="logout" v-if="isAuth">
        Logout
    </v-btn>
    </v-toolbar>
    <Nuxt />
    </v-main>
    <v-footer padless color="green" dark>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} &copy; AnonimX Pro
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth", user: "auth/user"
    }),
  },
  async created(){
    await this.$store.dispatch('auth/getAuthUser')
  },
  methods: {
    logout() {
      return this.$store.dispatch('auth/logoutUser')
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
  color: white !important;
}
.swal2-popup {
    font-family: "Roboto", sans-serif !important;
  }

.container {
  min-height: 0px !important;
}
</style>

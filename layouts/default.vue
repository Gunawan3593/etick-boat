<template>
  <v-app>
      <v-app-bar
        color="green"
        dark
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>etick-boat</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer 
      v-model="drawer" 
      absolute
      temporary
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      :overflow="true"
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="display-1">
            etick-boat
          </v-list-item-title>
          <v-list-item-subtitle>
            fast boat ticket online ordering
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-group
        :value="true"
        color="white"
        prepend-icon="mdi-account-supervisor-circle"
      >
        <template v-slot:activator>
            <v-list-item-title>Admin</v-list-item-title>
        </template>
        <v-list-item link>
            <v-list-item-title>Dashboard</v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon">mdi-view-grid</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>Vendor</v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon">mdi-sail-boat</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>Banking</v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon">mdi-piggy-bank</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>Pricing</v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon">mdi-tag-plus</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>Booking</v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon">mdi-clipboard-edit-outline</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>Payment</v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon">mdi-cash-register</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon v-text="icon">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon v-text="icon">mdi-web</v-icon>
        </v-list-item-icon>
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon v-text="icon">mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon v-text="icon">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>
    <v-main>
    <v-toolbar color="green" dark dense>
    <v-toolbar-title>etick-boat</v-toolbar-title>
    <v-toolbar-items v-if="isAuth"><span class="caption pl-1 pt-1"> Hallo {{ user.firstName }} <v-icon small>mdi-emoticon-happy-outline</v-icon></span> </v-toolbar-items>
    <v-spacer></v-spacer>
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
    <v-btn text>
      <nuxt-link to="/">
        Home
      </nuxt-link>
    </v-btn>
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
  data(){
    return {
      drawer : false
    }
  },
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

.v-navigation-drawer{
  height: 100vh !important;
}
</style>

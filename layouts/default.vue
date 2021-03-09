<template>
  <v-app>
      <v-app-bar
        color="green"
        dark
        app
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>etick-boat</v-toolbar-title>
      <v-spacer></v-spacer>
      Hallo {{ user.firstName }} <v-icon small class="ml-1">mdi-emoticon-happy-outline</v-icon>
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
        v-if="isAuth"
      >
        <template v-slot:activator>
            <v-list-item-title>Admin</v-list-item-title>
        </template>
        <nuxt-link to="/admin/dashboard">
          <v-list-item link>
              <v-list-item-title>Dashboard</v-list-item-title>
              <v-list-item-icon>
                <v-icon >mdi-view-grid</v-icon>
              </v-list-item-icon>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/admin/vendor">
          <v-list-item link>
              <v-list-item-title>Vendor</v-list-item-title>
              <v-list-item-icon>
                <v-icon >mdi-sail-boat</v-icon>
              </v-list-item-icon>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/admin/routing">
          <v-list-item link>
              <v-list-item-title>Routing</v-list-item-title>
              <v-list-item-icon>
                <v-icon >mdi-routes</v-icon>
              </v-list-item-icon>
          </v-list-item>
        </nuxt-link>
        <v-list-item link>
            <v-list-item-title>Banking</v-list-item-title>
            <v-list-item-icon>
              <v-icon >mdi-piggy-bank</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>Pricing</v-list-item-title>
            <v-list-item-icon>
              <v-icon >mdi-tag-plus</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>Booking</v-list-item-title>
            <v-list-item-icon>
              <v-icon >mdi-clipboard-edit-outline</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>Payment</v-list-item-title>
            <v-list-item-icon>
              <v-icon >mdi-cash-register</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <nuxt-link to="/">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon >mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </nuxt-link>
      <nuxt-link to="/about">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon >mdi-web</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
      </nuxt-link>
      <nuxt-link to="/auth/login" v-if="!isAuth">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon >mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </nuxt-link>
      <v-list-item @click="logout" link v-if="isAuth">
        <v-list-item-icon>
          <v-icon >mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>
    <v-main>
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
@media screen and (max-width: 375px) {
  body {
    max-width: 375px;
  }
  .v-card {
    max-width: 350px;
  }
  .v-card__text {
    min-width: 330px;
  }
}
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

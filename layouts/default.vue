<template>
  <v-app>
      <v-app-bar
        color="green"
        dark
        app
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <nuxt-link to="/">
          etick-boat
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="isAuth">Hallo {{ user.firstName }} <v-icon small class="ml-1">mdi-emoticon-happy-outline</v-icon></span>
      <nuxt-link to="/cart">
        <v-btn icon>
          <v-badge
          color="red"
          :content="cart"
          :value="cart"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </nuxt-link>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer 
      v-model="drawer" 
      app
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
        v-if="user.role == 1"
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
        <nuxt-link to="/admin/banking">
          <v-list-item link>
              <v-list-item-title>Banking</v-list-item-title>
              <v-list-item-icon>
                <v-icon >mdi-piggy-bank</v-icon>
              </v-list-item-icon>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/admin/pricing">
        <v-list-item link>
            <v-list-item-title>Pricing</v-list-item-title>
            <v-list-item-icon>
              <v-icon >mdi-tag-plus</v-icon>
            </v-list-item-icon>
        </v-list-item>
        </nuxt-link>
        <nuxt-link to="/admin/booking">
        <v-list-item link>
            <v-list-item-title>Booking</v-list-item-title>
            <v-list-item-icon>
              <v-icon >mdi-clipboard-edit-outline</v-icon>
            </v-list-item-icon>
        </v-list-item>
        </nuxt-link>
        <nuxt-link to="/admin/payment">
        <v-list-item link>
            <v-list-item-title>Payment</v-list-item-title>
            <v-list-item-icon>
              <v-icon >mdi-cash-register</v-icon>
            </v-list-item-icon>
        </v-list-item>
        </nuxt-link>
      </v-list-group>
      <nuxt-link to="/">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon >mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </nuxt-link>
      <nuxt-link v-if="isAuth" to="/booking">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon >mdi-clipboard-edit-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Bookings</v-list-item-title>
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
      isAuth: "auth/isAuth", user: "auth/user", cart: "cart/totalCart"
    }),
  },
  async fetch(){
    let data = await this.$store.dispatch('auth/getAuthUser');
    if(data){
      await this.$store.dispatch('cart/getAllCarts');
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logoutUser');
      this.$router.push('/auth/login');
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

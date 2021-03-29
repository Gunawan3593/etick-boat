<template>
  <v-container class="mt-10">
    <v-layout>
      <v-row
        align="center"
        justify="center"
      >
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
          <v-card
              class="mx-auto"
              max-width="300"
              outlined
          >
              <v-list-item three-line>
              <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Pending <span class="caption font-weight-bold">Order</span></v-list-item-title>
                  <v-list-item-subtitle>Total Pending Booking order today</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
                  color="error"
              ><span class="white--text font-weight-medium display-1">{{ pendingBooking }}</span></v-list-item-avatar>
              </v-list-item>
          </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
      <v-card
              class="mx-auto"
              max-width="300"
              outlined
          >
              <v-list-item three-line>
              <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Pending <span class="caption font-weight-bold">Payment</span></v-list-item-title>
                  <v-list-item-subtitle>Total pending payment today</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
                  color="orange lighten-1"
              ><span class="white--text font-weight-medium display-1">{{ pendingPayment }}</span></v-list-item-avatar>
              </v-list-item>
          </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
          <v-card
              class="mx-auto"
              max-width="300"
              outlined
          >
              <v-list-item three-line>
              <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Booking <span class="caption font-weight-bold">Success</span></v-list-item-title>
                  <v-list-item-subtitle>Total Booking Success today</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
                  color="light-green"
              ><span class="white--text font-weight-medium display-1">{{ bookingSuccess }}</span></v-list-item-avatar>
              </v-list-item>
          </v-card>
      </v-col>
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
        <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">Booking</v-list-item-title>
                <v-list-item-subtitle>Total booking on March</v-list-item-subtitle>
                {{ 100000| currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="blue darken-1"
            ><v-icon x-large dark>mdi-cart</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
     <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">Sold</v-list-item-title>
                <v-list-item-subtitle>Total booking sold on March</v-list-item-subtitle>
                {{ 100000 | currency }}
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="light-green"
            ><v-icon x-large dark>mdi-shopping</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="4"
    >
        <v-card
            class="mx-auto"
            max-width="300"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">TOP PRODUCT</v-list-item-title>
                <v-list-item-subtitle>Top Product on March</v-list-item-subtitle>
                Yamuna - 100.000
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="orange lighten-1"
            ><v-icon x-large dark>mdi-shopping-search</v-icon></v-list-item-avatar>
            </v-list-item>
        </v-card>
    </v-col>
    </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  middleware: 'authenticated',
  data(){
      return {
          pendingBooking: 0,
          bookingSuccess: 0,
          pendingPayment:0
      }
  },
  methods: {
    ...mapActions({
      countBooking: 'booking/countBooking',
      countPayment: 'payment/countPayment'
    }),
    async getData(){
      let date = this.$moment().format('YYYY-MM-DD');
      let params = {
          date: date,
          status: 0
      }
      let data = await this.countBooking(params);
      this.pendingBooking = data.total;
      params = {
          date: date,
          status: 2
      }
      data = await this.countBooking(params);
      this.bookingSuccess = data.total;
      params = {
          date: date,
          status: 0
      }
      data = await this.countPayment(params);
      this.pendingPayment = data.total;
    }
  },
  async fetch(){
      await this.getData();
  }
}
</script>

<style>

</style>
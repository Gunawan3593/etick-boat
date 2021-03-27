<template>
<v-container class="mt-10">
    <v-layout>
      <v-row class="justify-center">
        <v-col md="8" cols="12">
          <v-card elevation="2" > 
            <v-card-title>Booking Detail
            <v-spacer></v-spacer>
              <v-btn color="primary" small dark @click="$router.back()">Back</v-btn>
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
                <v-row>
                  <v-col md="3" cols="6">
                    <span class="caption font-weight-bold">No.</span><br> {{ booking.transNo }}
                  </v-col>
                  <v-col md="3" cols="6">
                    <span class="caption font-weight-bold">Date.</span><br> {{ this.$moment(booking.date).format('YYYY-MM-DD') }}
                  </v-col>
                  <v-col md="3" cols="6">
                    <span class="caption font-weight-bold">Due Date.</span><br> {{ this.$moment(booking.dueDate).format('YYYY-MM-DD') }}
                  </v-col>
                  <v-col md="3" cols="6">
                    <span class="caption font-weight-bold">Leave.</span><br> {{ this.$moment(booking.leaveSchedule).format('YYYY-MM-DD') }}
                  </v-col>
                  <v-col md="3" cols="6">
                    <span class="caption font-weight-bold">Go back.</span><br> {{ this.$moment(booking.gobackSchedule).format('YYYY-MM-DD') }}
                  </v-col>
                  <v-col md="3" cols="6">
                    <span class="caption font-weight-bold">Status</span><br>
                    <span v-if="booking.status == 0" class="red--text"><v-icon color="red">mdi-clock-alert</v-icon> Pending</span>
                    <span v-if="booking.status == 1" class="blue--text"><v-icon color="blue">mdi-cash-check</v-icon> Already Paid</span>
                    <span v-if="booking.status == 2" class="green--text"><v-icon color="green">mdi-checkbox-marked-circle</v-icon> Success</span>
                  </v-col>
                  <v-col md="3" cols="6">
                    <span class="caption font-weight-bold">Subtotal</span><br> {{ booking.subtotal | currency }}
                  </v-col>
                  <v-col md="3" cols="6">
                    <span class="caption font-weight-bold">Paid Amount</span><br> {{ booking.paidAmount | currency }}
                  </v-col>
                </v-row>
                <v-row class="caption" v-if="items.length == 0"><v-col lg="12" align="center"><span class="red--text">Booking dont have any order item.</span></v-col></v-row>
                <v-row class="caption" v-for="item in items" :key="item.id">
                      <v-col lg="2">
                        <span class="caption font-weight-bold">Vendor :</span><br>{{ item.vendor.name }}
                      </v-col>
                      <v-col lg="4">
                        <span class="caption font-weight-bold">Route :</span><br>{{ item.routeFrom.name }} - {{ item.routeTo.name }}
                      </v-col>
                      <v-col lg="1">
                          <span class="caption font-weight-bold">Adult :</span><br>{{ item.qtyAdult}}
                      </v-col>
                      <v-col lg="1">
                          <span class="caption font-weight-bold">Child :</span><br>{{ item.qtyChild}}
                      </v-col>
                      <v-col lg="2">
                          <span class="caption font-weight-bold">Price :</span><br>{{ item.pricing.price | currency }} <span class="caption">/{{ item.pricing.unit }}</span>
                      </v-col>
                      <v-col lg="2">
                          <span class="caption font-weight-bold">Amount :</span><br>{{ item.total | currency }}
                      </v-col>
                  </v-row>
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
  middleware: 'authenticated',
  data(){
    return {
      booking: {},
      items: {}
    }
  },
  methods: {
    ...mapActions({
      bookingById: 'booking/getBookingById',
      bookingItem: 'bookingItem/getListBookingItems'
    }),
    async viewData(id){
        let data = await this.bookingById(id);
        if(data){
          this.booking = data;
          this.isLoading = false;
          this.dialog = true;
        }
        let params = {
          booking: id
        }
        data = await this.bookingItem(params);
        if(data){
          this.items = data;
        }
    },
  },
  created(){
    this.viewData(this.$route.params.id);
  }
}
</script>

<style>

</style>
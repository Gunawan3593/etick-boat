<template>
<v-layout>
    <v-container class="mt-5">
      <v-row>
          <v-col cols="12">
              <v-card elevation="3">
                  <v-card-title>
                      My Bookings
                  </v-card-title>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-text>
                      <v-row v-if="bookings.length == 0"><v-col lg="12" align="center"><span class="red--text">You dont have any Booking.</span></v-col></v-row>
                      <v-card v-for="item in bookings" :key="item.id" elevation="3" class="mb-1">
                        <v-card-text>
                        <v-row class="caption">
                            <v-col lg="2" md="6" sm="6" cols="6"> 
                                <span class="font-weight-bold">No.</span><br>
                                {{ item.transNo }} <v-icon v-if="item.roundTrip" small color="primary">mdi-transit-transfer</v-icon>
                            </v-col>
                            <v-col lg="1" md="6" sm="6" cols="6">
                                <span class="font-weight-bold">Date</span><br>
                                {{ $moment(item.date).format('YYYY-MM-DD') }}
                            </v-col>
                            <v-col lg="1" md="6" sm="6" cols="6">
                                <span class="font-weight-bold">Due Date</span><br>
                                {{ $moment(item.dueDate).format('YYYY-MM-DD') }}
                            </v-col>
                            <v-col lg="1" md="6" sm="6" cols="6">
                                <span class="font-weight-bold">Leave</span><br>
                                {{ $moment(item.leaveSchedule).format('YYYY-MM-DD') }}
                            </v-col>
                            <v-col lg="1" md="6" sm="6" cols="6">
                                <span class="font-weight-bold">Go Back</span><br>
                                {{ (!item.gobackSchedule) ? '-' : $moment(item.gobackSchedule).format('YYYY-MM-DD') }}
                            </v-col>
                            <v-col lg="1" md="6" sm="6" cols="6">
                                <span class="font-weight-bold">Amount</span><br>
                                {{ item.subtotal | currency }}
                            </v-col>
                            <v-col lg="3" md="6" sm="6" cols="6">
                                <span class="font-weight-bold">Status</span><br>
                                <span v-if="item.status == 0" class="red--text"><v-icon color="red">mdi-clock-alert</v-icon> Pending</span>
                                <span v-if="item.status == 1" class="blue--text"><v-icon color="blue">mdi-cash-check</v-icon> Already Paid</span>
                                <span v-if="item.status == 2" class="green--text"><v-icon color="green">mdi-checkbox-marked-circle</v-icon> Success</span>
                                <span v-if="item.status == 3" class="red--text"><v-icon color="red">mdi-close-circle</v-icon> Void</span>
                                <span v-if="item.status == 4" class="orange--text"><v-icon color="orange">mdi-cash-minus</v-icon> Paid not completed</span>
                            </v-col>
                            <v-col lg="2" md="6" sm="6" cols="6">
                                <span class="font-weight-bold">Actions</span><br>
                                <nuxt-link v-if="item.paidAmount < item.subtotal" :to="`/payment/register/${item.id}`">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                  <v-btn text  
                                  v-on="on"
                                  v-bind="attrs"
                                  >
                                  <v-icon color="primary">mdi-cash-register</v-icon>
                                  </v-btn>
                                  </template>
                                  <span>Register payment</span>
                                </v-tooltip>
                                </nuxt-link>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                  <nuxt-link :to="`/view-booking/${item.id}`">
                                    <v-btn text  
                                      v-on="on"
                                      v-bind="attrs"
                                    >
                                    <v-icon color="primary">mdi-eye</v-icon>
                                    </v-btn>
                                  </nuxt-link>
                                  </template>
                                  <span>View</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                        </v-card-text>
                      </v-card>
                  <v-card-actions>
                  <v-row class="justify-right">
                    <v-spacer></v-spacer>
                    <div class="caption mt-5">Row per Page</div>
                    <v-col cols="3" md="2">
                      <v-select class="caption" dense
                        v-model="limit"
                        :items="perPages"
                      ></v-select>
                    </v-col>
                  </v-row>
                  </v-card-actions>
                  <v-col cols="12">
                    <div class="text-center">
                      <v-pagination
                        v-model="curpage"
                        :length="totalpage"
                        :total-visible="7"
                        circle
                      ></v-pagination>
                    </div>
                  </v-col>
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
  middleware: 'authenticated',
  data() {
    return {
      bookings: [],
      curpage: 1,
      search: '',
      limit: 10,
      totalpage: 0,
      perPages: [5,10,25,50,100],
    }
  },
  methods: {
    ...mapActions({
        myBooking : 'booking/getAuthenticatedBookings'
    }),
    async getData(){
      let data = await this.myBooking({ page : this.curpage, limit : this.limit, search : this.search});
      this.totalpage = data.paginator.pageCount;
      this.bookings = data.bookings;
    }
  },
  watch: {
    curpage() {
      this.getData();
    },
    search() {
      this.getData();
    },
    limit() {
      this.getData();
    }
  },
  created(){
      this.getData();
  }
}
</script>

<style>

</style>
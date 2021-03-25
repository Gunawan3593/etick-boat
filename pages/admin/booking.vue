<template>
<v-container class="mt-10">
    <v-layout>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-card elevation="2" > 
            <v-card-title class="display-1">Booking List<v-spacer></v-spacer><v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
              <v-simple-table dense>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        No.
                    </th>
                    <th class="text-left">
                        Date
                    </th>
                    <th class="text-left">
                        Due Date
                    </th>
                    <th class="text-left">
                        Leave
                    </th>
                    <th class="text-left">
                        Go Back
                    </th>
                    <th class="text-left">
                        Amount
                    </th>
                    <th class="text-center">
                        Status
                    </th>
                    <th class="text-center">
                        Actions
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="bookings.length == 0"><td colspan="8" class="text-center">No Data was found.</td></tr>
                    <tr
                    v-for="item in bookings"
                    :key="item.id"
                    >
                    <td class="text-left">{{ item.transNo }}</td>
                    <td class="text-left">{{ $moment(item.date).format('YYYY-MM-DD') }}</td>
                    <td class="text-left">{{ $moment(item.dueDate).format('YYYY-MM-DD') }}</td>
                    <td class="text-left">{{ $moment(item.leaveSchedule).format('YYYY-MM-DD') }}</td>
                    <td class="text-left">{{ (!item.gobackSchedule) ? '-' : $moment(item.gobackSchedule).format('YYYY-MM-DD') }}</td>
                    <td class="text-left">{{ item.subtotal | currency }}</td>
                    <td class="text-left">
                        <span v-if="item.status == 0" class="red--text"><v-icon color="red">mdi-clock-alert</v-icon> Pending</span>
                        <span v-if="item.status == 1" class="blue--text"><v-icon color="blue">mdi-cash-check</v-icon> Already Paid</span>
                        <span v-if="item.status == 2" class="green--text"><v-icon color="green">mdi-checkbox-marked-circle</v-icon> Success</span>
                    </td>
                    <td>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            small
                            class="mr-2"
                            v-on="on"
                            v-bind="attrs"
                          >
                            mdi-eye
                          </v-icon>
                        </template>
                        <span>View</span>
                      </v-tooltip>
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
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
    </v-layout>
</v-container>
</template>

<script> 
import { mapActions } from 'vuex';
export default {
  middleware: 'authenticated',
  asyncData() {
      return {
          curpage: 1,
          search: '',
          limit: 10,
          totalpage: 0,
          perPages: [5,10,25,50,100],
          bookings: [],
      }
  },
  methods: {
    ...mapActions({
      getBookings: 'booking/getAllBookings'
    }),
    async getData(){
        let data = await this.getBookings({ page : this.curpage, limit : this.limit, search : this.search});
        this.bookings = data.bookings;
        this.totalpage = data.paginator.pageCount;
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
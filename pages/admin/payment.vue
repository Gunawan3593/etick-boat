<template>
<v-layout>
<v-container class="mt-10">
      <v-row class="justify-center">
        <v-col cols="12">
          <v-card elevation="2" > 
            <v-card-title class="display-1">Payment List<v-spacer></v-spacer><v-spacer></v-spacer>
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
                        Bank
                    </th>
                    <th class="text-left">
                        Fund Sender
                    </th>
                    <th class="text-left">
                        Transfer by
                    </th>
                    <th class="text-left">
                        Transfer Date
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
                    <tr v-if="payments.length == 0"><td colspan="8" class="text-center">No Data was found.</td></tr>
                    <tr
                    v-for="item in payments"
                    :key="item.id"
                    >
                    <td class="text-left">{{ item.booking.transNo }}</td>
                    <td class="text-left">{{ item.bank.name }}</td>
                    <td class="text-left">{{ item.fundSender }}</td>
                     <td class="text-left">{{ item.transferBy }}</td>
                    <td class="text-left">{{ $moment(item.transferDate).format('YYYY-MM-DD') }}</td>
                    <td class="text-left">{{ item.amount | currency }}</td>
                    <td class="text-left">
                        <span v-if="item.status == 0" class="red--text"><v-icon color="red">mdi-clock-alert</v-icon> Pending</span>
                        <span v-if="item.status == 1" class="green--text"><v-icon color="green">mdi-checkbox-marked-circle</v-icon> Success</span>
                        <span v-if="item.status == 2" class="red--text"><v-icon color="red">mdi-close-circle</v-icon> Void</span>
                    </td>
                    <td>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            small
                            class="mr-2"
                            v-on="on"
                            v-bind="attrs"
                            @click="viewData(item.id)"
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
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
          <v-sheet>
        <v-layout>
        <v-container class="mb-2">
          <v-row>
            <v-col cols="12">
              <span class="headline">Payment Detail</span>
            </v-col>
            <v-divider class="mx-4 mb-4"></v-divider>
          </v-row>
                <v-row>
                  <v-col cols="6">
                    <span class="caption font-weight-bold">No.</span><br> {{ curPayment.booking.transNo }}
                  </v-col>
                  <v-col cols="6">
                    <span class="caption font-weight-bold">Bank.</span><br> {{ curPayment.bank.name }}
                  </v-col>
                  <v-col cols="6">
                    <span class="caption font-weight-bold">Sender.</span><br> {{ curPayment.fundSender }}
                  </v-col>
                  <v-col cols="6">
                    <span class="caption font-weight-bold">Transfer by.</span><br> {{ curPayment.transferBy }}
                  </v-col>
                  <v-col cols="6">
                    <span class="caption font-weight-bold">Transfer Date.</span><br> {{ this.$moment(curPayment.transferDate).format('YYYY-MM-DD') }}
                  </v-col>
                  <v-col cols="6">
                    <span class="caption font-weight-bold">Status</span><br>
                    <span v-if="curPayment.status == 0" class="red--text"><v-icon color="red">mdi-clock-alert</v-icon> Pending</span>
                    <span v-if="curPayment.status == 1" class="green--text"><v-icon color="green">mdi-checkbox-marked-circle</v-icon> Success</span>
                    <span v-if="curPayment.status == 2" class="red--text"><v-icon color="red">mdi-close-circle</v-icon> Void</span>
                  </v-col>
                  <v-col cols="6">
                    <span class="caption font-weight-bold">Subtotal</span><br> {{ curPayment.booking.subtotal | currency }}
                  </v-col>
                  <v-col cols="6">
                    <span class="caption font-weight-bold">Amount</span><br> {{ curPayment.amount | currency }}
                  </v-col>
                  <v-col cols="12">
                    <span class="caption font-weight-bold">Transfer Evidence</span><br>
                    <v-img :src="curPayment.transferEvidence"></v-img>
                  </v-col>
                </v-row>
              <v-row>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  :disabled="isLoading"
                  v-if="curPayment.status == 0"
                  @click="confirmData()"
              >
                  Confirm
              </v-btn>
              <v-btn
                  color="error"
                  text
                  v-if="curPayment.status !== 2"
                  @click="voidData()"
              >
                  Void
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
              >
                  Close
              </v-btn>
              </v-row>
          </v-container>
        </v-layout>
        </v-sheet>
      </v-dialog>
</v-container>
</v-layout>
</template>
<script> 
import { mapActions } from 'vuex';
export default {
  middleware: 'authenticated',
  data() {
      return {
          curpage: 1,
          search: '',
          limit: 10,
          totalpage: 0,
          perPages: [5,10,25,50,100],
          payments: [],
          isLoading: false,
          dialog: false,
          curPayment: {
            id: '',
            booking: {
              id: '',
              transNo: '',
              subtotal: 0
            },
            bank: {
              name: ''
            },
            fundSender: '',
            transferBy: '',
            transferDate: '',
            transferEvidence: '',
            amount: 0,
            status: 0
          }
      }
  },
  methods: {
    ...mapActions({
      getPayments: 'payment/getAllPayments', 
      paymentById: 'payment/getPaymentById', 
      statusPayment: 'payment/updateStatusPayment',
      bookingPaid: 'booking/updateBookingPaid',
      bookingStatus: 'booking/updateStatusBooking'
    }),
    async getData(){
        let data = await this.getPayments({ page : this.curpage, limit : this.limit, search : this.search});
        this.payments = data.payments;
        this.totalpage = data.paginator.pageCount;
    },
    async viewData(id){
        let data = await this.paymentById(id);
        if(data){
          this.curPayment = data;
          this.isLoading = false;
          this.dialog = true;
        }
    },
    async confirmData(){
      this.isLoading = true;
      let params, data;
      params = {
        id: this.curPayment.booking.id,
        paidAmount : this.curPayment.amount
      }
      data = await this.bookingPaid(params);
      if(data){
        let status = 4;
        if(data.paidAmount >= data.subtotal){
          status = 2;
        }
        params = {
          id: this.curPayment.booking.id,
          confirmDate: new Date(),
          status : status
        }
        data = await this.bookingStatus(params);
        if(data){
          params = {
            id: this.curPayment.id,
            confirmDate: new Date(),
            status : 1
          }
          data = await this.statusPayment(params);
          if(data){
            this.dialog = false;
          }
        }
      }
      this.isLoading = false;
    },
    async voidData(){
      this.isLoading = true;
      let params, data;
      if(this.curPayment.status == 1){
        params = {
          id: this.curPayment.booking.id,
          paidAmount : this.curPayment.amount *-1
        }
        data = await this.bookingPaid(params);
        if(data){
          let status = 4;
          if(data.paidAmount == 0){
            status = 0;
          }
          params = {
            id: this.curPayment.booking.id,
            voidDate: new Date(),
            status : status
          }
          data = await this.bookingStatus(params);
        }
      }
      params = {
        id: this.curPayment.id,
        voidDate: new Date(),
        status : 2
      }
      data = await this.statusPayment(params);
      if(data){
        this.dialog = false;
      }
      this.isLoading = false;
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
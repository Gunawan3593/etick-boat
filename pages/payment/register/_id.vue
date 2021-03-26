<template>
<v-layout>
    <v-container class="mt-5">
      <v-row justify="center">
          <v-col lg="6" md="6" cols="12">
              <v-card elevation="3">
                  <v-card-title>
                      Payment Register
                  </v-card-title>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          v-model="fields.bank"
                          :items="banks"
                          item-text="name"
                          item-value="id"
                          label="Bank"
                          prepend-inner-icon="mdi-bank"
                          solo
                        ></v-select>
                        <div class="text-left caption" v-for="(error,index) in errors.bank" :key="index">
                          <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          v-model="fields.transferBy"
                          :items="trfCats"
                          label="Transfer by"
                          prepend-inner-icon="mdi-bank-transfer-out"
                          solo
                        ></v-select>
                        <div class="text-left caption" v-for="(error,index) in errors.transferBy" :key="index">
                          <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          v-model="fields.fundSender"
                          prepend-inner-icon="mdi-card-account-details-outline"
                          label="Fund Sender"
                          placeholder="Fund Sender"
                          solo
                        ></v-text-field>
                        <div class="text-left caption" v-for="(error,index) in errors.fundSender" :key="index">
                          <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                    <v-col
                      cols="12"
                    >
                      <span class="blue--text"><v-icon color="primary" small class="pb-1">mdi-alert-circle</v-icon> Booking Amount {{ booking.subtotal | currency }}</span>
                      <v-currency-field 
                      v-model="fields.amount"
                      label="Amount"
                      placeholder="Amount"
                      prepend-inner-icon="mdi-tag"
                      solo
                      />
                      <div class="text-left caption" v-for="(error,index) in errors.amount" :key="index">
                        <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                      </div>
                    </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                      <v-menu
                            :close-on-content-click="true"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="fields.transferDate"
                                label="Transfer Date"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                solo
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="fields.transferDate"
                            ></v-date-picker>
                                <div class="text-left caption" v-for="(error,index) in errors.transferDate" :key="index">
                                <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                            </div>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <v-row>
                    <v-col
                      cols="12"
                    >
                      <input
                        v-model="fields.transferEvidence"
                        label="Image Path"
                        placeholder="Image Path"
                        type="hidden"
                      >
                      <v-file-input
                        v-model="imageUploader"
                        prepend-inner-icon="mdi-camera"
                        accept="image/*"
                        label="Transfer Evidence"
                        placeholder="Transfer Evidence"
                        @change="uploadImage"
                        prepend-icon
                        solo
                      ></v-file-input>
                    </v-col>
                    <div class="text-left caption" v-for="(error,index) in errors.transferEvidence" :key="index">
                      <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                    </div>
                  </v-row>
                   <v-row>
                    <v-col
                      cols="12"
                      class="text-center"
                    >
                      <v-img
                        max-height="150"
                        max-width="250"
                        :src="(fields.transferEvidence) ? fields.transferEvidence : 'https://p2t.jatimprov.go.id/assets/upload/berita/default-cover.png'"
                      ></v-img>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-textarea
                        v-model="fields.notes"
                        prepend-inner-icon="mdi-notebook-outline"
                        solo
                        name="input-7-4"
                        label="Notes"
                        placeholder="Notes"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  </v-card-text>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      :disabled="isloading"
                      @click="saveData()"
                  >
                      Save
                  </v-btn>
                  </v-card-actions>
              </v-card>
          </v-col>
      </v-row>
    </v-container>
</v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import { Toast } from '@/plugins/swal';

export default {
  middleware: 'authenticated',
  data(){
    return {
      fields: {
        booking : this.$route.params.id,
        bank: '',
        transferBy: '',
        fundSender: '',
        amount: 0,
        transferDate: '',
        transferEvidence: '',
        notes: ''
      },
      trfCats: ['Internet Banking','Transfer Atm','Mobile Banking','Other'],
      banks: [],
      isloading: false,
      imageUploader: [],
      booking: {}
    }
  },
  computed: {
    errors () {
      return this.$store.state.payment.errors
    }
  },
  methods: {
     ...mapActions({
      getPayments: 'payment/getAllPayments', 
      listBanks: 'bank/getListBanks', 
      refreshError: 'payment/refreshError', 
      newPayment: 'payment/newPayment', 
      updatePayment: 'payment/updatePayment', 
      deletePayment: 'payment/deletePayment', 
      imageUpload: 'payment/uploadPaymentImage', 
      bookingStatus: 'booking/updateStatusBooking',
      bookingById: 'booking/getBookingById'
    }),
    async uploadImage(){
      let data = await this.imageUpload(this.imageUploader);
      if(data){
        this.fields.transferEvidence = data;
      }
    },
    async getData(){
        this.banks = await this.listBanks({ status: true });
        this.booking = await this.bookingById(this.$route.params.id);
    },
    async saveData(){
      this.isloading = true;
      let data = await this.newPayment(this.fields);
      if(data){
        let params = {
          id: this.fields.booking,
          paidDate: this.$moment().format('YYYY-MM-DD hh:mm:ss'),
          status: 1
        }
        let status = await this.bookingStatus(params);
        if(status){
          Toast.fire({
              type: 'success',
              title: 'Payment registered successfully'
          });
          this.$router.push('/');
        }
      }
      this.isloading = false;
    }
  },
  created(){
    this.getData();
    this.fields.transferDate = this.$moment().format('YYYY-MM-DD');
  }
}
</script>

<style>

</style>
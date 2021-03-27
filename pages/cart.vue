<template>
  <v-layout>
    <v-container class="mt-5">
      <v-row>
          <v-col cols="12">
              <v-card elevation="3">
                  <v-card-title>
                      Shopping Cart
                  </v-card-title>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-text>
                    <v-row v-if="carts.length == 0"><v-col lg="12" align="center"><span class="red--text">You dont have any order on Shopping Cart.</span></v-col></v-row>
                    <v-row v-for="item in carts" :key="item.id">
                          <v-col lg="2">
                            Vendor :  {{ item.vendor.name }}
                          </v-col>
                          <v-col lg="3">
                            Route :  {{ item.routeFrom.name }} - {{ item.routeTo.name }}
                          </v-col>
                          <v-col lg="2">
                              Adult : {{ item.qtyAdult}} - Child : {{ item.qtyChild}}
                          </v-col>
                          <v-col lg="2">
                              Price : {{ item.pricing.price | currency }} <span class="caption">/{{ item.pricing.unit }}</span>
                          </v-col>
                          <v-col lg="2">
                              Amount : {{ item.total | currency }}
                          </v-col>
                          <v-col lg="1" align="center">
                              <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                                    v-on="on"
                                    v-bind="attrs"
                                >
                                    mdi-pencil
                                </v-icon>
                                </template>
                                <span>Edit</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="deleteItem(item.id)"
                                    v-on="on"
                                    v-bind="attrs"
                                >
                                    mdi-delete
                                </v-icon>
                                </template>
                                <span>Delete</span>
                            </v-tooltip>
                          </v-col>
                      </v-row>
                      <v-row>
                          <v-col lg="8" md="8" xs="12">
                            <v-switch
                                v-model="roundTrip"
                                label="Round Trip"
                            ></v-switch>
                          </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                        lg="6"
                        md="6"
                        xs="6"
                        >
                        <span class="caption">Leave Schedule</span>
                        <v-menu
                            :close-on-content-click="true"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="fields.leaveSchedule"
                                label="Leave"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                solo
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="fields.leaveSchedule"
                            :min="minDate"
                            ></v-date-picker>
                        </v-menu>
                        <div class="text-left caption" v-for="(error,index) in errors.leaveSchedule" :key="index">
                            <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                        </div>
                        </v-col>
                        <v-col
                        lg="6"
                        md="6"
                        xs="6"
                        >
                        <v-menu
                            :close-on-content-click="true"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            v-if="fields.roundTrip"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <span class="caption">Go back Schedule</span>
                            <v-text-field
                                v-model="fields.gobackSchedule"
                                label="Go Back"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                solo
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="fields.gobackSchedule"
                            :min="fields.leaveSchedule"
                            ></v-date-picker>
                        </v-menu>
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
                      <v-row>
                          <v-col cols="12" class="mt-3" align="right">
                            <span class="headline">Total : {{ fields.total | currency }} <span v-if="fields.roundTrip" class="caption">X2</span><span v-else class="caption">X1</span> = <span class="caption">Rp.</span>{{ fields.subtotal | currency }}</span>
                          </v-col>
                      </v-row>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn 
                        large 
                        color="primary"
                        :disabled="isloading || carts.length == 0"
                        @click="checkOut()"
                       >Checkout</v-btn>
                  </v-card-actions>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
            <v-card>
                <v-card-title>
                <span class="headline">Edit Order Boats</span>
                </v-card-title>
                <v-divider class="mx-4 mb-4"></v-divider>
                <v-card-text>
                <v-form>
                  <v-row class="justify-center">
                    <span class="headline"><v-icon class="mb-1">mdi-sale</v-icon> {{ item.name }}</span>
                  </v-row>
                  <v-row class="justify-center">
                    <span><v-icon class="mb-1">mdi-sail-boat</v-icon> {{ item.vendor.name }}</span>
                  </v-row>
                  <v-row class="justify-center">
                    <span><v-icon class="mb-1">mdi-routes</v-icon> {{ item.routeFrom.name }} - {{ item.routeTo.name }}</span>
                  </v-row>
                  <v-row
                  >
                    <v-col
                      lg="3"
                      md="6"
                      xs="6"
                    >
                      <span>Qty Adult</span>
                      <v-currency-field
                        v-model="item.qtyAdult"
                        prepend-inner-icon="mdi-human-handsdown"
                        label="Qty Adult"
                        placeholder="Qty Adult"
                        solo
                      ></v-currency-field>
                      <div class="text-left caption" v-for="(error,index) in errors.qtyAdult" :key="index">
                        <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                      </div>
                    </v-col>
                    <v-col
                      lg="3"
                      md="6"
                      xs="6"
                    >
                      <span>Qty Child</span>
                      <v-currency-field
                        v-model="item.qtyChild"
                        prepend-inner-icon="mdi-human-handsdown"
                        label="Qty child"
                        placeholder="Qty child"
                        solo
                      ></v-currency-field>
                    </v-col>
                    <v-col lg="6" md="12" xs="12" class="mb-6" align="center">
                      <span>Price</span><br>
                      <span class="display-2"><span class="caption">Rp.</span>{{ item.pricing.price | currency }}</span><span class="caption">/{{ item.pricing.unit }}</span>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <span class="caption">Total</span><span class="display-2"><span class="caption">Rp.</span>{{ totalItem | currency }}</span>
                  </v-row>
                </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    :disabled="isloading"
                    @click="updateItem()"
                >
                    Update
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    middleware: 'authenticated',
    asyncData(){
        return {
            carts: [],
            fields: {
                transNo: '',
                date: '',
                customer: '',
                leaveSchedule: '',
                gobackSchedule: null,
                dueDate: null,
                roundTrip : false,
                notes: '',
                total : 0,
                subtotal: 0,
                items : ''
            },
            roundTrip: false,
            isloading: false,
            item: {
                id: '',
                name: '',
                vendor: {
                    id: '',
                    name: ''
                },
                routeFrom: {
                    id: '',
                    name: ''
                },
                routeTo: {
                    id: '',
                    name: ''
                },
                qtyAdult: 0,
                qtyChild: 0,
                pricing: {
                    price: 0,
                    unit: ''
                },
                total: 0
            },
            dialog: false,
            minDate: ''
        }
    },
    computed:{
        ...mapGetters({
            user: "auth/user"
        }),
        errors () {
            return this.$store.state.cart.errors;
        },
        totalItem() {
            return this.item.pricing.price * this.item.qtyAdult;
        }
    },
    watch:{
        carts() {
            let total = 0;
            this.carts.forEach(item => {
                total += item.total;
            });
            this.fields.total = total;
            this.fields.subtotal = total;
            if(this.roundTrip){
                this.fields.subtotal = total * 2;
            }
        },
        totalItem(){
            this.item.total = this.totalItem;
        },
        roundTrip() {
            this.fields.roundTrip = this.roundTrip;
            this.fields.subtotal = this.fields.total;
            this.fields.gobackSchedule  = null;
            if(this.roundTrip){
                this.fields.subtotal = this.fields.total * 2;
                this.fields.gobackSchedule  = this.fields.leaveSchedule;
            }
        }
    },
    methods: {
        ...mapActions({
            getCarts : 'cart/getAllCarts', 
            updateCart: 'cart/updateCart', 
            newBooking: 'booking/newBooking',
            deleteCart:'cart/deleteCart', 
            refreshError: 'cart/refreshError'
        }),
        editItem(item){
            this.refreshError();
            this.item = { ...item };
            this.dialog = true;
        },
        async updateItem(){
            this.isloading = true;
            let params = {
                id: this.item.id,
                qtyAdult: this.item.qtyAdult,
                qtyChild: this.item.qtyChild,
                total: this.item.total
            }
            let data = await this.updateCart(params);
            if(data){
                this.getData();
                this.dialog = false;
            }
            this.isloading = false
        },
        async deleteItem(id){
            await this.deleteCart(id);
        },
        async checkOut(){
            this.isloading = true;
            let items = [];
            this.carts.forEach(item => {
                items.push({
                    pricing : item.pricing.id,
                    vendor : item.vendor.id,
                    routeFrom: item.routeFrom.id,
                    routeTo: item.routeTo.id,
                    qtyAdult: item.qtyAdult,
                    qtyChild: item.qtyChild,
                    total: item.total
                });
            });
            this.fields.items = JSON.stringify(items);
            this.fields.dueDate = this.$moment(this.fields.leaveSchedule).add(-1,'d').format('YYYY-MM-DD');
            let data = await this.newBooking(this.fields);
            if(data){
                let oldCarts = [{ ...this.carts }];
                oldCarts.forEach((item,index) => {
                    this.deleteCart(item[index].id);
                });
                this.$router.push(`/payment/register/${data.id}`);
            }
            this.isloading = false;
        }
    },
    async created(){
        let data = await this.getCarts();
        this.carts = data;
        this.fields.customer = this.user.id;
        this.fields.date = this.$moment().format('YYYY-MM-DD');
        this.minDate = this.$moment().add(1,'d').format('YYYY-MM-DD');
        this.fields.leaveSchedule = this.minDate;
    } 
}
</script>

<style>

</style>
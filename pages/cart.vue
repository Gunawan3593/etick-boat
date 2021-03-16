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
                              {{ item.vendor.name }}
                          </v-col>
                          <v-col lg="3">
                              {{ item.routeFrom.name }} - {{ item.routeTo.name }}
                          </v-col>
                          <v-col lg="3">
                              Adult : {{ item.qtyAdult}} - Child : {{ item.qtyChild}}
                          </v-col>
                          <v-col lg="2">
                              Price : {{ item.pricing.price | currency }} <span class="caption">/{{ item.pricing.unit }}</span>
                          </v-col>
                          <v-col lg="1">
                              {{ item.total | currency }}
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
                          <v-col cols="12" class="mt-3" align="right">
                            <span class="headline">Total : {{ fields.total | currency }} <span v-if="fields.roundTrip" class="caption">X2</span><span v-else class="caption">X1</span> = <span class="caption">Rp.</span>{{ fields.subTotal | currency }}</span>
                          </v-col>
                      </v-row>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn 
                        large 
                        color="primary"
                        :disabled="isloading"
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
import { mapActions } from 'vuex';
export default {
    middleware: 'authenticated',
    data(){
        return {
            carts: [],
            fields: {
                leaveSchedule: Date.now,
                gobackSchedule: null,
                roundTrip : false,
                total : 0,
                subTotal: 0,
                items : []
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
            dialog: false
        }
    },
    computed:{
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
            this.fields.subTotal = total;
            if(this.roundTrip){
                this.fields.subTotal = total * 2;
            }
        },
        totalItem(){
            this.item.total = this.totalItem;
        },
        roundTrip() {
            this.fields.roundTrip = this.roundTrip;
            this.fields.subTotal = this.fields.total;
            if(this.roundTrip){
                this.fields.subTotal = this.fields.total * 2;
            }
        }
    },
    methods: {
        ...mapActions({
            getCarts : 'cart/getAllCarts', updateCart: 'cart/updateCart', deleteCart:'cart/deleteCart', refreshError: 'cart/refreshError'
        }),
        async getData(){
            let data = await this.getCarts();
            this.carts = data;
        },
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
            this.fields.items = items;
        }
    },
    created(){
        this.getData();
    }
    
}
</script>

<style>

</style>
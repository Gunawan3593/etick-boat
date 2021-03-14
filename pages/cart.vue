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
                              {{ item.total | currency }}
                          </v-col>
                          <v-col lg="2">
                              <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item.id)"
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
                            <span class="headline">Total : {{ total | currency }} <span v-if="fields.roundTrip" class="caption">X2</span><span v-else class="caption">X1</span> = <span class="caption">Rp.</span>{{ fields.subTotal | currency }}</span>
                          </v-col>
                      </v-row>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn large color="primary">Checkout</v-btn>
                  </v-card-actions>
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
    data(){
        return {
            carts: [],
            fields: {
                roundTrip : false,
                total : 0,
                subTotal: 0
            },
            roundTrip: false
        }
    },
    computed:{
        total() {
            let total = 0;
            this.carts.forEach(item => {
                total += item.total;
            });
            return total;
        }
    },
    watch:{
        total() {
            this.fields.total = this.total;
            this.fields.subTotal = this.total;
        },
        roundTrip() {
            this.fields.roundTrip = this.roundTrip;
            this.fields.subTotal = this.total;
            if(this.roundTrip){
                this.fields.subTotal = this.total * 2;
            }
        }
    },
    methods: {
        ...mapActions({
            getCarts : 'cart/getAllCarts'
        }),
        async getData(){
            let data = await this.getCarts();
            this.carts = data;
        }
    },
    created(){
        this.getData();
    }
    
}
</script>

<style>

</style>
<template>
  <v-layout>
    <v-container class="mt-10 justify-center">
        <v-row>
          <v-col cols="12">
            <v-carousel
            height="400"
            cycle
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(item,i) in slides"
              :key="i"
              :src="item.src"
            >
              <v-sheet
                color="rgba(0, 0, 0, 0.5)"
                height="10%"
                class="mt-10"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-1">
                    {{ item.caption }}
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-sheet
              color="green"
              elevation="9"
              height="50"
              dark
            >
              <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-1">
                    <v-icon large>mdi-ship-wheel</v-icon>
                    Boats Pricing
                  </div>
                </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(item, index) in prices" :key="index" lg="3" md="6" xs="12">
            <v-card elevation="5">
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>
              <v-img height="200" :src="(item.imagePath) ? item.imagePath : 'https://p2t.jatimprov.go.id/assets/upload/berita/default-cover.png'" />
              <div class="text-center">
              <v-divider class="mt-4"></v-divider>
              <span><v-icon>mdi-sail-boat</v-icon> {{ item.vendor.name }}</span>
              <v-divider></v-divider>
              <span><v-icon>mdi-routes</v-icon> {{ item.routeFrom.name }} - {{ item.routeTo.name }}</span>
              <v-divider></v-divider>
              <span class="display-1"><v-icon>mdi-tag</v-icon> <span class="caption">Rp.</span>{{ item.price | currency }}</span><span class="caption">/{{ item.unit }}</span>
              <v-divider></v-divider>
              </div>
            </v-card-text>
            <v-card-actions>
                <v-layout justify-center>
                  <v-btn large color="primary" @click="orderTicket(item.id)">Order</v-btn>
                </v-layout>
            </v-card-actions>
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
                <span class="headline">Order Boats</span>
                </v-card-title>
                <v-divider class="mx-4 mb-4"></v-divider>
                <v-card-text>
                <v-form>
                  <v-row class="justify-center">
                    <span class="headline"><v-icon class="mb-1">mdi-sale</v-icon> {{ fields.name }}</span>
                  </v-row>
                  <v-row class="justify-center">
                    <span><v-icon class="mb-1">mdi-sail-boat</v-icon> {{ fields.vendor.name }}</span>
                  </v-row>
                  <v-row class="justify-center">
                    <span><v-icon class="mb-1">mdi-routes</v-icon> {{ fields.routeFrom.name }} - {{ fields.routeTo.name }}</span>
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
                        v-model="fields.qtyAdult"
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
                        v-model="fields.qtyChild"
                        prepend-inner-icon="mdi-human-handsdown"
                        label="Qty child"
                        placeholder="Qty child"
                        solo
                      ></v-currency-field>
                    </v-col>
                    <v-col lg="6" md="12" xs="12" class="mb-6" align="center">
                      <span>Price</span><br>
                      <span class="display-2"><span class="caption">Rp.</span>{{ fields.price | currency }}</span><span class="caption">/{{ fields.unit }}</span>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <span class="caption">Total</span><span class="display-2"><span class="caption">Rp.</span>{{ total | currency }}</span>
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
                    @click="saveData()"
                >
                    Add to Cart
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
  data() {
    return {
      fields: {
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
        price: '',
        unit: '',
        qtyAdult: 0,
        qtyChild: 0,
        roundTrip: false,
        total : 0
      },
      dialog: false,
      isloading: false,
      slides: [
        {
          src: 'https://www.balitoursclub.net/wp-content/uploads/2019/08/Speed-boat-Yamuna-Express-ke-Nusa-Penida.jpg',
          caption: 'Yamuna Express'
        },
        {
          src: 'https://cdn.water-sport-bali.com/wp-content/uploads/2014/05/Fast-Boat-Wahana-Gili-Ocean-II.jpg',
          caption: 'Wahana Gili Ocean II'
        },
        {
          src: 'https://lh3.googleusercontent.com/-k5HL1A1H1oQ/WBPTpLLAtYI/AAAAAAAADMM/0fHSrvLBd7M/s640/blogger-image-1979537033.jpg',
          caption: 'Blue Water Express'
        },
        {
          src: 'https://lh3.googleusercontent.com/-Sm1NBzdfc2c/VrVa4TzkTaI/AAAAAAAACnc/95dDUBL-dZ8/s640/blogger-image--1975066449.jpg',
          caption: 'Marina Srikandi II'
        }
      ],
      prices : []
    }
  },
  computed: {
    errors () {
      return this.$store.state.cart.errors;
    },
    total() {
      return this.fields.qtyAdult * this.fields.price;
    }
  },
  watch: {
    total(){
      this.fields.total = this.total;
    }
  },
  methods: {
    ...mapActions({
      listPrices: 'price/getListPrices', priceById: 'price/getPriceById', newCart: 'cart/newCart', refreshError: 'cart/refreshError'
    }),
    async getPricing(status){
      let data = await this.listPrices(status);
      if(data){
        this.prices = data;
      }
    },
    async orderTicket(id){
      this.refreshError();
      this.fields.qtyAdult = 0;
      this.fields.qtyChild = 0;
      this.isloading = false;
      let data = await this.priceById(id);
      if(data){
        let dt = this.fields;
        dt.id = data.id;
        dt.name = data.name;
        dt.vendor.id = data.vendor.id;
        dt.vendor.name = data.vendor.name;
        dt.routeFrom.id = data.routeFrom.id;
        dt.routeFrom.name = data.routeFrom.name;
        dt.routeTo.id = data.routeTo.id;
        dt.routeTo.name = data.routeTo.name;
        dt.price = data.price;
        dt.unit = data.unit;
        this.dialog=true;
      }
    },
    async saveData() {
      this.isloading = true;
      let params = {
        pricing : this.fields.id,
        vendor: this.fields.vendor.id,
        routeFrom: this.fields.routeFrom.id,
        routeTo: this.fields.routeTo.id,
        qtyAdult : this.fields.qtyAdult,
        qtyChild: this.fields.qtyChild,
        total : this.fields.total
      }
      let data = await this.newCart(params);
      if(data){
        this.dialog = false;
      }else{
        this.isloading = false;
      }
    }
  },
  created(){
    this.getPricing(true);
  }
}
</script>

<style>

</style>

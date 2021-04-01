<template>
<v-container class="mt-10">
    <v-layout>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-card elevation="2" > 
            <v-card-title class="display-1">Price List<v-spacer></v-spacer><v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn text class="mt-4" @click="addData()"><v-icon color="green">mdi-plus-thick</v-icon></v-btn></v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
              <v-simple-table dense>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Vendor
                    </th>
                    <th class="text-left">
                        Route from
                    </th>
                    <th class="text-left">
                        Route to
                    </th>
                    <th class="text-left">
                        Price
                    </th>
                    <th class="text-left">
                        Unit
                    </th>
                    <th class="text-center">
                        Active
                    </th>
                    <th class="text-center">
                        Actions
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="prices.length == 0"><td colspan="8" class="text-center">No Data was found.</td></tr>
                    <tr
                    v-for="item in prices"
                    :key="item.id"
                    >
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-left">{{ item.vendor.name }}</td>
                    <td class="text-left">{{ item.routeFrom.name }}</td>
                    <td class="text-left">{{ item.routeTo.name }}</td>
                    <td class="text-left">{{ item.price | currency }}</td>
                    <td class="text-left">{{ item.unit }}</td>
                    <td>
                      <v-icon v-if="item.active" color="green" dark>mdi-check-circle</v-icon>
                      <v-icon v-if="!item.active" color="red" dark>mdi-minus-circle</v-icon>
                    </td>
                    <td>
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
        <v-card>
            <v-card-title>
            <span class="headline"><span v-if="!fields.id">New</span><span v-else>Edit</span> Price</span>
            </v-card-title>
            <v-divider class="mx-4 mb-4"></v-divider>
            <v-card-text>
            <v-form>
              <v-row>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="fields.name"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    label="Name"
                    placeholder="Name"
                    solo
                  ></v-text-field>
                  <div class="text-left caption" v-for="(error,index) in errors.name" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-select
                    v-model="fields.vendor"
                    :items="vendors"
                    item-text="name"
                    item-value="id"
                    label="Select Vendor"
                    prepend-inner-icon="mdi-sail-boat"
                    solo
                  ></v-select>
                  <div class="text-left caption" v-for="(error,index) in errors.vendor" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="fields.routeFrom"
                    :items="routes"
                    item-text="name"
                    item-value="id"
                    label="Route from"
                    prepend-inner-icon="mdi-routes"
                    solo
                  ></v-select>
                  <div class="text-left caption" v-for="(error,index) in errors.routeFrom" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="fields.routeTo"
                    :items="routes"
                    item-text="name"
                    item-value="id"
                    label="Route to"
                    prepend-inner-icon="mdi-routes"
                    solo
                  ></v-select>
                  <div class="text-left caption" v-for="(error,index) in errors.routeTo" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12" md="6"
                >
                  <span class="caption">Price</span>
                  <v-currency-field 
                  v-model="fields.price"
                  label="Price"
                  prepend-inner-icon="mdi-tag"
                  placeholder="Price"
                  solo
                  />
                </v-col>
                <v-col
                  cols="12" md="6"
                >
                  <span class="caption">Unit</span>
                  <v-select
                    v-model="fields.unit"
                    :items="units"
                    label="Select Unit"
                    prepend-inner-icon="mdi-account"
                    solo
                  ></v-select>
                  <div class="text-left caption" v-for="(error,index) in errors.unit" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <input
                    v-model="fields.imagePath"
                    label="Image Path"
                    placeholder="Image Path"
                    type="hidden"
                  >
                  <v-file-input
                    v-model="imageUploader"
                    prepend-inner-icon="mdi-camera"
                    accept="image/*"
                    label="Image Upload"
                    @change="uploadImage"
                    prepend-icon
                    solo
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  class="text-center"
                >
                  <v-img
                    max-height="150"
                    max-width="250"
                    :src="(fields.imagePath) ? fields.imagePath : 'https://p2t.jatimprov.go.id/assets/upload/berita/default-cover.png'"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="fields.descriptions"
                    prepend-inner-icon="mdi-notebook-outline"
                    solo
                    name="input-7-4"
                    label="Descriptions"
                    placeholder="Descriptions"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12">
                      <v-switch
                        v-model="fields.active"
                        label="Active"
                        ></v-switch>
                  </v-col>
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
                Save
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
          fields: {
              id: false,
              name: '',
              descriptions: '',
              unit: '',
              price: 0,
              vendor: '',
              routeFrom: '',
              routeTo: '',
              imagePath: '',
              active: true
          },
          units: ['Pax','Other'],
          dialog: false,
          prices: [],
          isloading: false,
          imageUploader: []
      }
  },
  methods: {
    ...mapActions({
      getPrices: 'price/getAllPrices', listVendors: 'vendor/getListVendors', listRoutes: 'route/getListRoutes', refreshError: 'price/refreshError', newPrice: 'price/newPrice', priceById: 'price/getPriceById', updatePrice: 'price/updatePrice', deletePrice: 'price/deletePrice', imageUpload: 'price/uploadPriceImage'
    }),
    addData(){
      this.isloading = false;
      this.refreshError();
      this.dialog = true;
      this.fields = {
          id: false,
          name: '',
          descriptions: '',
          unit: '',
          price: 0,
          vendor: '',
          routeFrom: '',
          routeTo: '',
          imagePath: '',
          active: true
      }
      this.imageUploader = []
    },
    async getData(){
        let data = await this.getPrices({ page : this.curpage, limit : this.limit, search : this.search});
        this.prices = data.prices;
        this.totalpage = data.paginator.pageCount;
        let vendors = await this.listVendors({ status: true });
        let routes = await this.listRoutes({ status: true });
    },
    async saveData(){
        this.isloading = true;
        if(!this.fields.id){
            let data = await this.newPrice(this.fields);
            if(data){
              this.dialog = false;
            }else{
              this.isloading = false;
            }
        }else{
            let data = await this.updatePrice(this.fields);
            if(data){
              this.dialog = false;
            }else{
              this.isloading = false;
            }
        }
    },
    async editItem(id){
      this.addData();
      await this.priceById(id);
      let data = {...this.$store.state.price.currentPrice};
      if(data){
        let dt = this.fields;
        dt.id = data.id;
        dt.name = data.name;
        dt.vendor = data.vendor.id;
        dt.routeFrom = data.routeFrom.id;
        dt.routeTo = data.routeTo.id;
        dt.price = data.price;
        dt.unit = data.unit;
        dt.descriptions = data.descriptions; 
        dt.active = data.active;
        dt.imagePath = data.imagePath;
        this.dialog = true;
      }
    },
    async deleteItem(id){
      await this.deletePrice(id);
      this.getData();
    },
    async uploadImage(){
      let data = await this.imageUpload(this.imageUploader);
      if(data){
        this.fields.imagePath = data;
      }
    }
  },
  computed: {
    errors () {
      return this.$store.state.price.errors
    },
    vendors() {
      return this.$store.state.vendor.lists
    },
    routes() {
      return this.$store.state.route.lists
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
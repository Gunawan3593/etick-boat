<template>
<v-layout>
<v-container class="mt-10">
      <v-row class="justify-center">
        <v-col cols="12">
          <v-card elevation="2" > 
            <v-card-title class="display-1">Vendor List<v-spacer></v-spacer><v-spacer></v-spacer>
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
                        Descriptions
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
                    <tr v-if="vendors.length == 0"><td colspan="4" class="text-center">No Data was found.</td></tr>
                    <tr
                    v-for="item in vendors"
                    :key="item.id"
                    >
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-left">{{ item.descriptions }}</td>
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
          <v-sheet>
        <v-layout>
        <v-container class="mb-2">
          <v-row>
            <v-col cols="12">
              <span class="headline"><span v-if="!fields.id">New</span><span v-else>Edit</span> Vendor</span>
            </v-col>
            <v-divider class="mx-4 mb-4"></v-divider>
          </v-row>
              <v-row>
                <v-col
                  cols="12"
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
                  <div class="text-left caption" v-for="(error,index) in errors.descriptions" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
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
            <v-row>
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
              active: true
          },
          dialog: false,
          vendors: [],
          isloading: false
      }
  },
  methods: {
    ...mapActions({
      getVendors: 'vendor/getAllVendors', refreshError: 'vendor/refreshError', newVendor: 'vendor/newVendor', vendorById: 'vendor/getVendorById', updateVendor: 'vendor/updateVendor', deleteVendor: 'vendor/deleteVendor'
    }),
    addData(){
      this.isloading = false;
      this.refreshError();
      this.dialog = true;
      this.fields = {
        id: false,
        name: '',
        descriptions: '',
        active: true
      }
    },
    async getData(){
        let data = await this.getVendors({ page : this.curpage, limit : this.limit, search : this.search});
        this.vendors = data.vendors;
        this.totalpage = data.paginator.pageCount;
    },
    async saveData(){
        this.isloading = true;
        if(!this.fields.id){
            let data = await this.newVendor(this.fields);
            if(data){
              this.dialog = false;
            }else{
              this.isloading = false;
            }
        }else{
            let data = await this.updateVendor(this.fields);
            if(data){
              this.dialog = false;
            }else{
              this.isloading = false;
            }
        }
    },
    async editItem(id){
      this.addData();
      await this.vendorById(id);
      let data = {...this.$store.state.vendor.currentVendor};
      if(data){
        this.fields = data;
        this.dialog = true;
      }
    },
    async deleteItem(id){
      await this.deleteVendor(id);
      this.getData();
    }
  },
  computed: {
    errors () {
      return this.$store.state.vendor.errors
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
<template>
<v-container class="mt-10">
    <v-layout>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-card elevation="2" > 
            <v-card-title class="display-1">Vendor List<v-spacer></v-spacer><v-btn text small @click="dialog=true"><v-icon color="green">mdi-plus</v-icon></v-btn></v-card-title>
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
                    <td class="text-left">{{ item.active }}</td>
                    <td><v-btn text>Delete</v-btn></td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
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
            <span class="headline">New Vendor</span>
            </v-card-title>
            <v-divider class="mx-4 mb-4"></v-divider>
            <v-card-text>
            <v-form>
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
                    prepend-inner-icon="mdi-map-marker"
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
  data() {
      return {
          fields: {
              id: false,
              name: '',
              descriptions: '',
              active: true
          },
          dialog: false,
          vendors: []
      }
  },
  methods: {
    ...mapActions({
      getVendors: 'vendor/getAllVendors', refreshError: 'vendor/refreshError', newVendor: 'vendor/newVendor'
    }),
    async getData(){
        await this.getVendors();
        let data = this.$store.state.vendor.vendors;
        this.vendors = [];
        data.forEach(vendor => {
            this.vendors.push(vendor);
        });
    },
    async saveData(){
        if(!this.fields.id){
            let data = await this.newVendor(this.fields);
            if(data){
                this.getData();
                this.dialog = false;
            }
        }else{

        }
    }
  },
  computed: {
    errors () {
      return this.$store.state.vendor.errors
    }
  },
  created(){
      this.getData();
  }
}
</script>

<style>
  
</style>
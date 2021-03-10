<template>
<v-container class="mt-10">
    <v-layout>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-card elevation="2" > 
            <v-card-title class="display-1">Bank List<v-spacer></v-spacer><v-spacer></v-spacer>
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
                        Itno
                    </th>
                    <th class="text-left">
                        Account
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
                    <tr v-if="banks.length == 0"><td colspan="6" class="text-center">No Data was found.</td></tr>
                    <tr
                    v-for="item in banks"
                    :key="item.id"
                    >
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-left">{{ item.itno }}</td>
                    <td class="text-left">{{ item.account }}</td>
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
            <span class="headline"><span v-if="!fields.id">New</span><span v-else>Edit</span> Bank</span>
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
                  <v-text-field
                    v-model="fields.itno"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    label="Itno"
                    placeholder="Itno"
                    solo
                  ></v-text-field>
                  <div class="text-left caption" v-for="(error,index) in errors.itno" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="fields.account"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    label="Account Number"
                    placeholder="Account Number"
                    solo
                  ></v-text-field>
                  <div class="text-left caption" v-for="(error,index) in errors.account" :key="index">
                    <span class="red--text"><v-icon color="error" small class="pb-1">mdi-alert-decagram</v-icon> {{ error[0] }}</span>
                  </div>
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
              itno: '',
              account: '',
              active: true,
              notes: ''
          },
          dialog: false,
          banks: [],
          isloading: false
      }
  },
  methods: {
    ...mapActions({
      getBanks: 'bank/getAllBanks', refreshError: 'bank/refreshError', newBank: 'bank/newBank', bankById: 'bank/getBankById', updateBank: 'bank/updateBank', deleteBank: 'bank/deleteBank'
    }),
    addData(){
      this.isloading = false;
      this.refreshError();
      this.dialog = true;
      this.fields = {
        id: false,
        name: '',
        itno: '',
        account: '',
        active: true,
        notes: ''
      }
    },
    async getData(){
        let data = await this.getBanks({ page : this.curpage, limit : this.limit, search : this.search});
        this.banks = data.banks;
        this.totalpage = data.paginator.pageCount;
    },
    async saveData(){
        this.isloading = true;
        if(!this.fields.id){
            let data = await this.newBank(this.fields);
            if(data){
              this.dialog = false;
            }else{
              this.isloading = false;
            }
        }else{
            let data = await this.updateBank(this.fields);
            if(data){
              this.dialog = false;
            }else{
              this.isloading = false;
            }
        }
    },
    async editItem(id){
      this.addData();
      await this.bankById(id);
      let data = {...this.$store.state.bank.currentBank};
      if(data){
        this.fields = data;
        this.dialog = true;
      }
    },
    async deleteItem(id){
      await this.deleteBank(id);
      this.getData();
    }
  },
  computed: {
    errors () {
      return this.$store.state.bank.errors
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
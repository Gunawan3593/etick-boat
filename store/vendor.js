import {
    VENDOR_BY_LIMIT_PAGE,
    VENDOR_BY_ID,
    CREATE_NEW_VENDOR,
    EDIT_VENDOR_BY_ID,
    DELETE_VENDOR_BY_ID,
    GET_ALL_VENDORS
  } from '../gql';
  
  import { Toast } from '../plugins/swal';
  
  export const state = () => ({
    vendors: [],
    currentVendor: {},
    lists: [],
    errors: {}
  });
  
  export const getters = {
    vendors: state => state.vendors,
    lists: state => state.lists,
    errors: state=> state.errors,
    currentVendor: state=> state.currentVendor
  };
  
  export  const actions = {
    async getAllVendors({ commit }, pages) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: VENDOR_BY_LIMIT_PAGE,
                variables: pages
            });
            let res = data.data.getVendorsByLimitAndPage;
            commit('SET_VENDOR',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async getListVendors({ commit }, status) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_ALL_VENDORS,
                variables: status
            });
            let res = data.data.getAllVendors;
            commit('SET_LIST_VENDOR',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async newVendor({
        commit 
    }, inputData) {
      try{
        let apolloClient = this.app.apolloProvider.defaultClient;
        let data = await apolloClient.mutate({
            mutation: CREATE_NEW_VENDOR,
            variables: inputData
        });
        if(data) {
            Toast.fire({
                type: 'success',
                title: 'Vendor added successfully'
            });
            commit('ADD_VENDOR',data.data.createNewVendor)
        }
        return data;
      }catch(err){
          let errors = err.message.split(': ')[1].split(',');
          let resErrors = [];
          if(errors){
              errors.forEach(error =>  {
                  let res = error.split(':');
                  if(resErrors[res[0]] == undefined){ 
                      resErrors[res[0]] = []
                  }
                  resErrors[res[0]].push([res[1]]);
              })
          }
          resErrors = Object.assign({}, resErrors);
          commit('SET_ERROR',resErrors);
      }
    },
    async getVendorById({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: VENDOR_BY_ID,
                variables: { id: id }
            });
            let res = data.data.getVendorById;
            commit('SET_CURRENT_VENDOR',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async updateVendor({ commit }, inputData){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: EDIT_VENDOR_BY_ID,
                variables: inputData
            });
            let res = data.data.editVendorByID;
            if(res){
                commit('UPDATE_VENDOR',res);
                Toast.fire({
                    type: 'success',
                    title: 'Vendor updated successfully'
                });
            }
            return res;
        } catch (err) {
            let errors = err.message.split(': ')[1].split(',');
            let resErrors = [];
            if(errors){
                errors.forEach(error =>  {
                    let res = error.split(':');
                    if(resErrors[res[0]] == undefined){ 
                        resErrors[res[0]] = []
                    }
                    resErrors[res[0]].push([res[1]]);
                })
            }
            resErrors = Object.assign({}, resErrors);
            commit('SET_ERROR',resErrors);
        }
    },
    async deleteVendor({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: DELETE_VENDOR_BY_ID,
                variables: { id: id }
            });
            let res = data.data.deleteVendorById;
            if(res.success){
                Toast.fire({
                    type: 'success',
                    title: 'Vendor deleted successfully'
                });
                commit('DELETE_VENDOR',res);
            }
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    refreshError({ commit }){
        commit('REFRESH_ERROR');
    }
  };
  
  export const mutations = {
    SET_VENDOR(state, payload) {
        state.vendors = payload.vendors;
    },
    SET_LIST_VENDOR(state, payload) {
        state.lists = payload;
    },
    ADD_VENDOR(state, payload) {
        state.vendors.unshift(payload);
    },
    SET_CURRENT_VENDOR(state, payload) {
        state.currentVendor =  payload
    },
    UPDATE_VENDOR(state, payload){
        let index = state.vendors.findIndex(vendor => vendor.id == payload.id);
        let dt = state.vendors;
        if(index >= 0){
            dt[index].name = payload.name;
            dt[index].descriptions = payload.descriptions;
            dt[index].active = payload.active;
        }
    },
    DELETE_VENDOR(state, payload){
        let id = payload.id;
        if(id){
            let index = state.vendors.findIndex(vendor => vendor.id === payload.id);
            state.vendors.splice(index, 1);
        }
    },
    SET_ERROR(state, payload){
        state.errors = payload;
    },
    REFRESH_ERROR(state){
          state.errors = {}
    }
  };
  
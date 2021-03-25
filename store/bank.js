import {
  BANK_BY_LIMIT_PAGE,
  BANK_BY_ID,
  CREATE_NEW_BANK,
  EDIT_BANK_BY_ID,
  DELETE_BANK_BY_ID,
  GET_ALL_BANKS
} from '../gql';

import { Toast } from '../plugins/swal';

export const state = () => ({
  banks: [],
  lists: [],
  currentBank: {},
  errors: {}
});

export const getters = {
  banks: state => state.banks,
  lists: state => state.lists,
  errors: state=> state.errors,
  currentBank: state=> state.currentBank
};

export  const actions = {
  async getAllBanks({ commit }, pages) {
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.query({
              query: BANK_BY_LIMIT_PAGE,
              variables: pages
          });
          let res = data.data.getBanksByLimitAndPage;
          commit('SET_BANK',res);
          return res;
      } catch (err) {
        console.log(err.message.split(': ')[1]);
      }
  },
  async getListBanks({ commit }, status) {
    try {
        let apolloClient = this.app.apolloProvider.defaultClient;
        let data = await apolloClient.query({
            query: GET_ALL_BANKS,
            variables: status
        });
        let res = data.data.getAllBanks;
        commit('SET_LIST_BANK',res);
        return res;
    } catch (err) {
        console.log(err.message.split(': ')[1]);
    }
  },
  async newBank({
      commit 
  }, inputData) {
    try{
      let apolloClient = this.app.apolloProvider.defaultClient;
      let data = await apolloClient.mutate({
          mutation: CREATE_NEW_BANK,
          variables: inputData
      });
      if(data) {
          Toast.fire({
              type: 'success',
              title: 'Bank added successfully'
          });
          commit('ADD_BANK',data.data.createNewBank)
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
  async getBankById({ commit }, id){
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.query({
              query: BANK_BY_ID,
              variables: { id: id }
          });
          let res = data.data.getBankById;
          commit('SET_CURRENT_BANK',res);
          return res;
      } catch (err) {
        console.log(err.message.split(': ')[1]);
      }
  },
  async updateBank({ commit }, inputData){
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.mutate({
              mutation: EDIT_BANK_BY_ID,
              variables: inputData
          });
          let res = data.data.editBankByID;
          if(res){
              commit('UPDATE_BANK',res);
              Toast.fire({
                  type: 'success',
                  title: 'Bank updated successfully'
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
  async deleteBank({ commit }, id){
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.mutate({
              mutation: DELETE_BANK_BY_ID,
              variables: { id: id }
          });
          let res = data.data.deleteBankById;
          if(res.success){
              Toast.fire({
                  type: 'success',
                  title: 'Bank deleted successfully'
              });
              commit('DELETE_BANK',res);
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
  SET_BANK(state, payload) {
      state.banks = payload.banks;
  },
  ADD_BANK(state, payload) {
      state.banks.unshift(payload);
  },
  SET_LIST_BANK(state, payload) {
    state.lists = payload;
  },
  SET_CURRENT_BANK(state, payload) {
      state.currentBank =  payload
  },
  UPDATE_BANK(state, payload){
      let index = state.banks.findIndex(bank => bank.id == payload.id);
      let dt = state.banks;
      if(index >= 0){
          dt[index].name = payload.name;
          dt[index].itno = payload.itno;
          dt[index].account = payload.account;
          dt[index].active = payload.active;
          dt[index].notes = payload.notes;
      }
  },
  DELETE_BANK(state, payload){
      let id = payload.id;
      if(id){
          let index = state.banks.findIndex(bank => bank.id === payload.id);
          state.banks.splice(index, 1);
      }
  },
  SET_ERROR(state, payload){
      state.errors = payload;
  },
  REFRESH_ERROR(state){
        state.errors = {}
  }
};

import {
    PAYMENT_BY_LIMIT_PAGE,
    PAYMENT_BY_ID,
    CREATE_NEW_PAYMENT,
    EDIT_PAYMENT_BY_ID,
    DELETE_PAYMENT_BY_ID,
    UPLOAD_FILE,
    GET_ALL_PAYMENTS
  } from '../gql';
  
  import { Toast } from '../plugins/swal';
  
  export const state = () => ({
    payments: [],
    currentPayment: {},
    errors: {},
    image: '',
    lists: []
  });
  
  export const getters = {
    payments: state => state.payments,
    errors: state=> state.errors,
    currentPayment: state=> state.currentPayment,
    image: state=> state.image,
    lists: state=> state.lists
  };
  
  export  const actions = {
    async getAllPayments({ commit }, pages) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: PAYMENT_BY_LIMIT_PAGE,
                variables: pages
            });
            let res = data.data.getPaymentsByLimitAndPage;
            commit('SET_PAYMENT',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async getListPayments({ commit }, status) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_ALL_PAYMENTS,
                variables: status
            });
            let res = data.data.getAllPayments;
            commit('SET_LIST_PAYMENT',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async newPayment({
        commit 
    }, inputData) {
      try{
        let apolloClient = this.app.apolloProvider.defaultClient;
        let data = await apolloClient.mutate({
            mutation: CREATE_NEW_PAYMENT,
            variables: inputData
        });
        if(data) {
            commit('ADD_PAYMENT',data.data.createNewPayment);
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
    async getPaymentById({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: PAYMENT_BY_ID,
                variables: { id: id }
            });
            let res = data.data.getPaymentById;
            commit('SET_CURRENT_PAYMENT',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async updatePayment({ commit }, inputData){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: EDIT_PAYMENT_BY_ID,
                variables: inputData
            });
            let res = data.data.editPaymentByID;
            if(res){
                commit('UPDATE_PAYMENT',res);
                Toast.fire({
                    type: 'success',
                    title: 'Payment updated successfully'
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
    async deletePayment({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: DELETE_PAYMENT_BY_ID,
                variables: { id: id }
            });
            let res = data.data.deletePaymentById;
            if(res.success){
                Toast.fire({
                    type: 'success',
                    title: 'Payment deleted successfully'
                });
                commit('DELETE_PAYMENT',res);
            }
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    refreshError({ commit }){
        commit('REFRESH_ERROR');
    },
    async uploadPaymentImage({ commit }, image){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: UPLOAD_FILE,
                variables: { file: image }
            });
            let res = data.data.imageUploader;
            if(res.success){
                Toast.fire({
                    type: 'success',
                    title: 'Image uploaded successfully'
                });
                commit('SET_IMAGE',res);
            }
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    }
  };
  
  export const mutations = {
    SET_PAYMENT(state, payload) {
        state.payments = payload.payments;
    },
    ADD_PAYMENT(state, payload) {
        state.payments.push(payload);
    },
    SET_CURRENT_PAYMENT(state, payload) {
        state.currentPayment =  payload
    },
    UPDATE_PAYMENT(state, payload){
        let index = state.payments.findIndex(payment => payment.id == payload.id);
        let dt = state.payments;
        if(index >= 0){
            dt[index].name = payload.name;
            dt[index].vendor.name = payload.vendor.name;
            dt[index].routeFrom.name = payload.routeFrom.name;
            dt[index].routeTo.name = payload.routeTo.name;
            dt[index].payment = payload.payment;
            dt[index].unit = payload.unit;
            dt[index].descriptions = payload.descriptions;
            dt[index].active = payload.active;
        }
    },
    DELETE_PAYMENT(state, payload){
        let id = payload.id;
        if(id){
            let index = state.payments.findIndex(payment => payment.id === payload.id);
            state.payments.splice(index, 1);
        }
    },
    SET_ERROR(state, payload){
        state.errors = payload;
    },
    REFRESH_ERROR(state){
        state.errors = {}
    },
    SET_IMAGE(state, payload){
        state.image = payload
    },
    SET_LIST_PAYMENT(state, payload){
        state.lists = payload
    }
  };
  
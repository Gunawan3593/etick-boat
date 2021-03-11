import {
    PRICE_BY_LIMIT_PAGE,
    PRICE_BY_ID,
    CREATE_NEW_PRICE,
    EDIT_PRICE_BY_ID,
    DELETE_PRICE_BY_ID,
    UPLOAD_FILE
  } from '../gql';
  
  import { Toast } from '../plugins/swal';
  
  export const state = () => ({
    prices: [],
    currentPrice: {},
    errors: {},
    image: ''
  });
  
  export const getters = {
    prices: state => state.prices,
    errors: state=> state.errors,
    currentPrice: state=> state.currentPrice,
    image: state=> state.image
  };
  
  export  const actions = {
    async getAllPrices({ commit }, pages) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: PRICE_BY_LIMIT_PAGE,
                variables: pages
            });
            let res = data.data.getPricesByLimitAndPage;
            commit('SET_PRICE',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async newPrice({
        commit 
    }, inputData) {
      try{
        let apolloClient = this.app.apolloProvider.defaultClient;
        let data = await apolloClient.mutate({
            mutation: CREATE_NEW_PRICE,
            variables: inputData
        });
        if(data) {
            Toast.fire({
                type: 'success',
                title: 'Price added successfully'
            });
            commit('ADD_PRICE',data.data.createNewPrice)
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
    async getPriceById({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: PRICE_BY_ID,
                variables: { id: id }
            });
            let res = data.data.getPriceById;
            commit('SET_CURRENT_PRICE',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async updatePrice({ commit }, inputData){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: EDIT_PRICE_BY_ID,
                variables: inputData
            });
            let res = data.data.editPriceByID;
            if(res){
                commit('UPDATE_PRICE',res);
                Toast.fire({
                    type: 'success',
                    title: 'Price updated successfully'
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
    async deletePrice({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: DELETE_PRICE_BY_ID,
                variables: { id: id }
            });
            let res = data.data.deletePriceById;
            if(res.success){
                Toast.fire({
                    type: 'success',
                    title: 'Price deleted successfully'
                });
                commit('DELETE_PRICE',res);
            }
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    refreshError({ commit }){
        commit('REFRESH_ERROR');
    },
    async uploadPriceImage({ commit }, image){
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
    SET_PRICE(state, payload) {
        state.prices = payload.prices;
    },
    ADD_PRICE(state, payload) {
        state.prices.push(payload);
    },
    SET_CURRENT_PRICE(state, payload) {
        state.currentPrice =  payload
    },
    UPDATE_PRICE(state, payload){
        let index = state.prices.findIndex(price => price.id == payload.id);
        let dt = state.prices;
        if(index >= 0){
            dt[index].name = payload.name;
            dt[index].vendor.name = payload.vendor.name;
            dt[index].routeFrom.name = payload.routeFrom.name;
            dt[index].routeTo.name = payload.routeTo.name;
            dt[index].price = payload.price;
            dt[index].unit = payload.unit;
            dt[index].descriptions = payload.descriptions;
            dt[index].active = payload.active;
        }
    },
    DELETE_PRICE(state, payload){
        let id = payload.id;
        if(id){
            let index = state.prices.findIndex(price => price.id === payload.id);
            state.prices.splice(index, 1);
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
    }
  };
  
import {
    CREATE_NEW_CART,
    GET_ALL_CART,
    CART_BY_PRICE_ID,
    EDIT_CART_BY_ID,
    DELETE_CART_BY_ID
  } from '../gql';
  
  import { Toast } from '../plugins/swal';
  
  export const state = () => ({
    carts: [],
    currentCart: {},
    errors: {}
  });
  
  export const getters = {
    carts: state => state.carts,
    errors: state=> state.errors,
    currentCart: state=> state.currentCart
  };
  
  export  const actions = {
    async getAllCarts({ commit }) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_ALL_CART
            });
            let res = data.data.getAllCarts;
            commit('SET_CART',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async newCart({
         commit
    }, inputData) {
      try{
        let apolloClient = this.app.apolloProvider.defaultClient;
        let data = await apolloClient.mutate({
            mutation: CREATE_NEW_CART,
            variables: inputData
        });
        let res = data.data.createNewCart;
        if(res) {
            Toast.fire({
                type: 'success',
                title: 'Cart added successfully'
            });
            commit('ADD_CART',res);
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
    async getCartById({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: CART_BY_ID,
                variables: { id: id }
            });
            let res = data.data.getCartById;
            commit('SET_CURRENT_CART',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async cartByPriceId({}, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: CART_BY_PRICE_ID,
                variables: { pricing: id }
            });
            let res = data.data.getCartByPriceId;
            if(res.id != null){
                Toast.fire({
                    type: 'error',
                    title: 'Order item is already on Shopping Cart.'
                });
            }
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async updateCart({ commit }, inputData){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: EDIT_CART_BY_ID,
                variables: inputData
            });
            let res = data.data.editCartByID;
            if(res){
                commit('UPDATE_CART',res);
                Toast.fire({
                    type: 'success',
                    title: 'Cart updated successfully'
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
    async deleteCart({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: DELETE_CART_BY_ID,
                variables: { id: id }
            });
            let res = data.data.deleteCartById;
            if(res.success){
                Toast.fire({
                    type: 'success',
                    title: 'Cart deleted successfully'
                });
                commit('DELETE_CART',res);
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
    SET_CART(state, payload) {
        state.carts = payload;
    },
    ADD_CART(state, payload) {
        state.carts.push(payload);
    },
    SET_CURRENT_CART(state, payload) {
        state.currentCart =  payload
    },
    UPDATE_CART(state, payload){
        let index = state.carts.findIndex(cart => cart.id == payload.id);
        let dt = state.carts;
        if(index >= 0){
            dt[index] = payload;
        }
    },
    DELETE_CART(state, payload){
        let id = payload.id;
        if(id){
            let index = state.carts.findIndex(cart => cart.id === payload.id);
            state.carts.splice(index, 1);
        }
    },
    SET_ERROR(state, payload){
        state.errors = payload;
    },
    REFRESH_ERROR(state){
          state.errors = {}
    }
  };
  
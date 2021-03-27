import {
  GET_ALL_BOOKING_ITEMS
} from '../gql';

import { Toast } from '../plugins/swal';

export const state = () => ({
  bookingItems: [],
  currentBookingItem: {},
  lists: [],
  errors: {}
});

export const getters = {
  bookingItems: state => state.bookingItems,
  lists: state => state.lists,
  errors: state=> state.errors,
  currentBookingItem: state=> state.currentBookingItem
};

export  const actions = {
  async getAllBookingItems({ commit }, pages) {
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.query({
              query: BOOKING_ITEM_BY_LIMIT_PAGE,
              variables: pages
          });
          let res = data.data.getBookingItemsByLimitAndPage;
          commit('SET_BOOKING_ITEM',res);
          return res;
      } catch (err) {
        console.log(err.message.split(': ')[1]);
      }
  },
  async getListBookingItems({ commit }, booking) {
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.query({
              query: GET_ALL_BOOKING_ITEMS,
              variables: booking
          });
          let res = data.data.getAllBookingItems;
          commit('SET_LIST_BOOKING_ITEM',res);
          return res;
      } catch (err) {
        console.log(err.message.split(': ')[1]);
      }
  },
  async newBookingItem({
      commit 
  }, inputData) {
    try{
      let apolloClient = this.app.apolloProvider.defaultClient;
      let data = await apolloClient.mutate({
          mutation: CREATE_NEW_BOOKING_ITEM,
          variables: inputData
      });
      if(data) {
          Toast.fire({
              type: 'success',
              title: 'BookingItem added successfully'
          });
          commit('ADD_BOOKING_ITEM',data.data.createNewBookingItem)
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
  async getBookingItemById({ commit }, id){
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.query({
              query: BOOKING_ITEM_BY_ID,
              variables: { id: id }
          });
          let res = data.data.getBookingItemById;
          commit('SET_CURRENT_BOOKING_ITEM',res);
          return res;
      } catch (err) {
        console.log(err.message.split(': ')[1]);
      }
  },
  async updateBookingItem({ commit }, inputData){
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.mutate({
              mutation: EDIT_BOOKING_ITEM_BY_ID,
              variables: inputData
          });
          let res = data.data.editBookingItemByID;
          if(res){
              commit('UPDATE_BOOKING_ITEM',res);
              Toast.fire({
                  type: 'success',
                  title: 'BookingItem updated successfully'
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
  async deleteBookingItem({ commit }, id){
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let data = await apolloClient.mutate({
              mutation: DELETE_BOOKING_ITEM_BY_ID,
              variables: { id: id }
          });
          let res = data.data.deleteBookingItemById;
          if(res.success){
              Toast.fire({
                  type: 'success',
                  title: 'BookingItem deleted successfully'
              });
              commit('DELETE_BOOKING_ITEM',res);
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
  SET_BOOKING_ITEM(state, payload) {
      state.bookingItems = payload.bookingItems;
  },
  SET_LIST_BOOKING_ITEM(state, payload) {
      state.lists = payload;
  },
  ADD_BOOKING_ITEM(state, payload) {
      state.bookingItems.unshift(payload);
  },
  SET_CURRENT_BOOKING_ITEM(state, payload) {
      state.currentBookingItem =  payload
  },
  UPDATE_BOOKING_ITEM(state, payload){
      let index = state.bookingItems.findIndex(bookingItem => bookingItem.id == payload.id);
      let dt = state.bookingItems;
      if(index >= 0){
          dt[index].name = payload.name;
          dt[index].descriptions = payload.descriptions;
          dt[index].active = payload.active;
      }
  },
  DELETE_BOOKING_ITEM(state, payload){
      let id = payload.id;
      if(id){
          let index = state.bookingItems.findIndex(bookingItem => bookingItem.id === payload.id);
          state.bookingItems.splice(index, 1);
      }
  },
  SET_ERROR(state, payload){
      state.errors = payload;
  },
  REFRESH_ERROR(state){
        state.errors = {}
  }
};

import {
    BOOKING_BY_LIMIT_PAGE,
    BOOKING_BY_ID,
    CREATE_NEW_BOOKING,
    EDIT_BOOKING_BY_ID,
    DELETE_BOOKING_BY_ID,
    GET_ALL_BOOKINGS
  } from '../gql';
  
  import { Toast } from '../plugins/swal';
  
  export const state = () => ({
    bookings: [],
    currentBooking: {},
    lists: [],
    errors: {}
  });
  
  export const getters = {
    bookings: state => state.bookings,
    lists: state => state.lists,
    errors: state=> state.errors,
    currentBooking: state=> state.currentBooking
  };
  
  export  const actions = {
    async getAllBookings({ commit }, pages) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: BOOKING_BY_LIMIT_PAGE,
                variables: pages
            });
            let res = data.data.getBookingsByLimitAndPage;
            commit('SET_BOOKING',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async getListBookings({ commit }, status) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_ALL_BOOKINGS,
                variables: status
            });
            let res = data.data.getAllBookings;
            commit('SET_LIST_BOOKING',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async newBooking({
        commit 
    }, inputData) {
      try{
        let apolloClient = this.app.apolloProvider.defaultClient;
        let data = await apolloClient.mutate({
            mutation: CREATE_NEW_BOOKING,
            variables: inputData
        });
        if(data) {
            Toast.fire({
                type: 'success',
                title: 'Booking added successfully'
            });
            commit('ADD_BOOKING',data.data.createNewBooking)
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
    async getBookingById({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: BOOKING_BY_ID,
                variables: { id: id }
            });
            let res = data.data.getBookingById;
            commit('SET_CURRENT_BOOKING',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async updateBooking({ commit }, inputData){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: EDIT_BOOKING_BY_ID,
                variables: inputData
            });
            let res = data.data.editBookingByID;
            if(res){
                commit('UPDATE_BOOKING',res);
                Toast.fire({
                    type: 'success',
                    title: 'Booking updated successfully'
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
    async deleteBooking({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: DELETE_BOOKING_BY_ID,
                variables: { id: id }
            });
            let res = data.data.deleteBookingById;
            if(res.success){
                Toast.fire({
                    type: 'success',
                    title: 'Booking deleted successfully'
                });
                commit('DELETE_BOOKING',res);
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
    SET_BOOKING(state, payload) {
        state.bookings = payload.bookings;
    },
    SET_LIST_BOOKING(state, payload) {
        state.lists = payload;
    },
    ADD_BOOKING(state, payload) {
        state.bookings.push(payload);
    },
    SET_CURRENT_BOOKING(state, payload) {
        state.currentBooking =  payload
    },
    UPDATE_BOOKING(state, payload){
        let index = state.bookings.findIndex(booking => booking.id == payload.id);
        let dt = state.bookings;
        if(index >= 0){
            dt[index].name = payload.name;
            dt[index].descriptions = payload.descriptions;
            dt[index].active = payload.active;
        }
    },
    DELETE_BOOKING(state, payload){
        let id = payload.id;
        if(id){
            let index = state.bookings.findIndex(booking => booking.id === payload.id);
            state.bookings.splice(index, 1);
        }
    },
    SET_ERROR(state, payload){
        state.errors = payload;
    },
    REFRESH_ERROR(state){
          state.errors = {}
    }
  };
  
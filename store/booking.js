import {
    BOOKING_BY_LIMIT_PAGE,
    CREATE_NEW_BOOKING,
    GET_BOOKING_NO,
    AUTHENTICATED_BOOKING_BY_LIMIT_PAGE,
    UPDATE_STATUS_BOOKING,
    UPDATE_BOOKING_PAID,
    BOOKING_BY_ID,
    COUNT_BOOKING_BY_DATE,
    GET_TOTAL_BOOKING_BY_DATE,
    TOP_BOOKING_BY_DATE,
    GET_BOOKING_WEEKLY,
    GET_BOOKING_BY_TIME
  } from '../gql';
  
  import { Toast } from '../plugins/swal';
  
  export const state = () => ({
    bookings: [],
    currentBooking: {},
    lists: [],
    errors: {},
    bookingNo: '',
    myBookings: []
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
    async getAuthenticatedBookings({ commit }, pages) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: AUTHENTICATED_BOOKING_BY_LIMIT_PAGE,
                variables: pages
            });
            let res = data.data.getAuthenticatedBookingsByLimitAndPage;
            commit('SET_MY_BOOKING',res);
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
    async getBookingNo({ commit }) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_BOOKING_NO
            });
            let res = data.data.getBookingNo;
            commit('SET_BOOKING_NO',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async countBooking({}, inputData) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: COUNT_BOOKING_BY_DATE,
                variables: inputData
            });
            let res = data.data.countBookingByDate;
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async totalBooking({}, inputData) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_TOTAL_BOOKING_BY_DATE,
                variables: inputData
            });
            let res = data.data.getTotalBookingByDate;
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async topBooking({}, inputData) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: TOP_BOOKING_BY_DATE,
                variables: inputData
            });
            let res = data.data.getTopBookingByDate;
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async bookingByTime({}, inputData) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_BOOKING_BY_TIME,
                variables: inputData
            });
            let res = data.data.getBookingByTime;
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async bookingWeekly({}, inputData) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_BOOKING_WEEKLY,
                variables: inputData
            });
            let res = data.data.getBookingWeekly;
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async newBooking({
        commit, dispatch, state
    }, inputData) {
      try{
        await dispatch('getBookingNo');
        inputData.transNo = state.bookingNo;
        let apolloClient = this.app.apolloProvider.defaultClient;
        let data = await apolloClient.mutate({
            mutation: CREATE_NEW_BOOKING,
            variables: inputData
        });
        let res = data.data.createNewBooking;
        if(res) {
            Toast.fire({
                type: 'success',
                title: 'Booking added successfully'
            });
            commit('ADD_BOOKING',res);
            commit('ADD_MY_BOOKING',res);
            commit('RESET_BOOKING_NO');
        }
        return res;
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
    },
    async updateStatusBooking({ commit }, inputData){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: UPDATE_STATUS_BOOKING,
                variables: inputData
            });
            let res = data.data.updatedBookingStatus;
            if(res){
                commit('UPDATE_STATUS_BOOKING',res);
            }
            return res;
        } catch (err) {
            console.log(err.message.split(': ')[1]);
        }
    },
    async updateBookingPaid({ commit }, inputData){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: UPDATE_BOOKING_PAID,
                variables: inputData
            });
            let res = data.data.updatedBookingPaid;
            return res;
        } catch (err) {
            console.log(err.message.split(': ')[1]);
        }
    }
  };
  
  export const mutations = {
    SET_BOOKING(state, payload) {
        state.bookings = payload.bookings;
    },
    SET_MY_BOOKING(state, payload){
        state.myBookings = payload.bookings;
    },
    ADD_MY_BOOKING(state, payload){
        state.myBookings.unshift(payload);
    },
    SET_LIST_BOOKING(state, payload) {
        state.lists = payload;
    },
    SET_BOOKING_NO(state, payload){
        state.bookingNo = payload.transNo;
    },
    RESET_BOOKING_NO(state){
        state.bookingNo = '';
    },
    ADD_BOOKING(state, payload) {
        state.bookings.unshift(payload);
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
    UPDATE_STATUS_BOOKING(state, payload){
        let index = state.bookings.findIndex(booking => booking.id == payload.id);
        let dt = state.bookings;
        if(index >= 0){
            dt[index].status = payload.status;
        }

        index = state.myBookings.findIndex(booking => booking.id == payload.id);
        dt = state.myBookings;
        if(index >= 0){
            dt[index].status = payload.status;
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
  
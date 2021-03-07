import {
    GET_ALL_VENDORS,
    VENDOR_BY_ID,
    CREATE_NEW_VENDOR,
    EDIT_VENDOR_BY_ID,
    DELETE_VENDOR_BY_ID
  } from '../gql';
  
  import { Toast } from '../plugins/swal';
  
  export const state = () => ({
    vendors: [],
    errors: {}
  });
  
  export const getters = {
    vendors: state => state.vendors,
    errors: state=> state.errors
  };
  
  export  const actions = {
    async getAllVendors({ commit }) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_ALL_VENDORS
            });
            let res = data.data.getAllVendors;
            commit('SET_VENDOR',res);
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
    async setAuthUserData({ commit }, payload) {
        commit('LOGIN_USER', payload);
        commit('SET_TOKEN', payload);
        //Set token in local storage
        localStorage.setItem('apollo-token', payload.token.split(' ')[1]);
        this.$apolloHelpers.onLogin(payload.token.split(' ')[1]);
        //Redirect the user to the dashboard
        Toast.fire({
          type: 'success',
          title: 'Login successfully'
        })
        this.$router.push('/dashboard');
    },
    async getAuthUser({ commit, dispatch }) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let {
                data: { authUserProfile }
            } = await apolloClient.query({
                query: AUTHENTICATED_USER
            });
            let token = this.$apolloHelpers.getToken();
            commit('LOGIN_USER', { user: authUserProfile, token: token });
        } catch (err) {
            console.log(err);
            //dispatch('logoutUser')
        }
    },
    logoutUser({ commit, state }) {
        if (state.token) {
            // eslint-disable-next-line
            Toast.fire({
                type: 'success',
                title: 'You are now logged out.'
            });
        }
        if (process.browser) {
          localStorage.removeItem('apollo-token');
          this.$apolloHelpers.onLogout();
          this.$router.push('/auth/login');
        }
        commit('LOGOUT_USER');
    },
    refreshError({ commit }){
        commit('REFRESH_ERROR');
    }
  };
  
  export const mutations = {
    SET_VENDOR(state, payload) {
        state.vendors = payload;
    },
    SET_TOKEN(state, payload) {
        state.token = payload.token;
    },
    LOGOUT_USER(state) {
        state.authStatus = false;
        state.user = {};
        state.token = null;
    },
    SET_ERROR(state, payload){
        state.errors = payload;
    },
    REFRESH_ERROR(state){
          state.errors = {}
    }
  };
  
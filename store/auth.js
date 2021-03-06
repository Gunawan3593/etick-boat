import {
  REGISTER_USER,
  AUTHENTICATED_USER,
  AUTHENTICATE_USER
} from '../gql';

import { Toast } from '../plugins/swal';

export const state = () => ({
  authStatus: false,
  user: {},
  token: null,
  errors: {}
});

export const getters = {
  user: state => state.user,
  isAuth: state => !!state.token,
  authStatus: state => state.authStatus,
  errors: state=> state.errors
};

export  const actions = {
  async loginUser({ commit, dispatch }, userData) {
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let { data: { authenticateUser } } = await apolloClient.query({
              query: AUTHENTICATE_USER,
              variables: userData
          });
          dispatch('setAuthUserData', authenticateUser);
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
  async registerUser({
      dispatch, commit
  }, userData) {
    try{
      let apolloClient = this.app.apolloProvider.defaultClient;
      let { data: { registerUser } } = await apolloClient.mutate({
          mutation: REGISTER_USER,
          variables: userData
      });
      // console.log("RESPONSE_APOLLO", resp);
      dispatch('setAuthUserData', registerUser);
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
      this.$apolloHelpers.onLogin(payload.token.split(' ')[1]);
      //Redirect the user to the dashboard
      Toast.fire({
        type: 'success',
        title: 'Login successfully'
      });
      if(payload.user.role == 1){
        this.$router.push('/admin/dashboard');
      }else{
        this.$router.push('/');
      }
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
          if (!authUserProfile){
            dispatch('logoutUser');
          }
          commit('LOGIN_USER', { user: authUserProfile, token: token });
      } catch (err) {
        dispatch('logoutUser');
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
      this.$apolloHelpers.onLogout();
      commit('LOGOUT_USER');
  },
  refreshError({ commit }){
      commit('REFRESH_ERROR');
  }
};

export const mutations = {
  LOGIN_USER(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      state.authStatus = true;
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

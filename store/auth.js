import {
  REGISTER_USER,
  AUTHENTICATED_USER,
  AUTHENTICATE_USER
} from '../gql';

let ls = null;
if (process.browser) {
  ls = localStorage.getItem('apollo-token')
}

export const state = () => ({
  authStatus: false,
  user: {},
  token: ls || null,
  errors: {}
});

import { Toast } from '../plugins/swal';

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
      //Set token in local storage
      localStorage.setItem('apollo-token', payload.token.split(' ')[1]);
      //Redirect the user to the dashboard
      Toast.fire({
        type: 'success',
        title: 'Login successfully'
      })
      this.$router.push('/about');
  },
  async getAuthUser({ commit, dispatch }) {
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let {
              data: { authUserProfile }
          } = await apolloClient.query({
              query: AUTHENTICATED_USER
          });
          commit('LOGIN_USER', { user: authUserProfile });
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
      }
      commit('LOGOUT_USER');
  }
};

export const mutations = {
  LOGIN_USER(state, payload) {
      state.user = payload.user;
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
  }
};

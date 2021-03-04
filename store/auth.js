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
});

export const getters = {
  user: state => state.user,
  isAuth: state => !!state.token,
  authStatus: state => state.authStatus
};

export  const actions = {
  async loginUser({ dispatch }, userData) {
      try {
          let apolloClient = this.app.apolloProvider.defaultClient;
          let { data: { authenticateUser } } = await apolloClient.query({
              query: AUTHENTICATE_USER,
              variables: userData
          });
          dispatch('setAuthUserData', authenticateUser);
      } catch (err) {
          // eslint-disable-next-line
          Toast.fire({
              icon: 'error',
              html: "<div class='text-left text-danger pl-2'>"+err.message.split(': ')[1]+"</div>"
          });
      }
  },
  async registerUser({
      dispatch
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
      console.log(errors)
    }
  },
  async setAuthUserData({ commit }, payload) {
      commit('LOGIN_USER', payload);
      commit('SET_TOKEN', payload);
      //Set token in local storage
      localStorage.setItem('apollo-token', payload.token.split(' ')[1]);
      //Redirect the user to the dashboard
      router.push('/dashboard');
      // eslint-disable-next-line
      Toast.fire({
          icon: 'success',
          title: 'You are now logged in.'
      });
  },
  async getAuthUser({ commit, dispatch }) {
      try {
          let {
              data: { authUserProfile }
          } = await apolloClient.query({
              query: AUTHENTICATED_USER
          });
          commit('LOGIN_USER', { user: authUserProfile });
      } catch (err) {
          dispatch('logoutUser')
      }
  },
  logoutUser({ commit, state }) {
      if (state.token) {
          // eslint-disable-next-line
          Toast.fire({
              icon: 'success',
              title: 'You are now logged out.'
          });
      }
      localStorage.removeItem('apollo-token');
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
  }
};

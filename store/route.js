import {
    ROUTE_BY_LIMIT_PAGE,
    ROUTE_BY_ID,
    CREATE_NEW_ROUTE,
    EDIT_ROUTE_BY_ID,
    DELETE_ROUTE_BY_ID,
    GET_ALL_ROUTES
  } from '../gql';
  
  import { Toast } from '../plugins/swal';
  
  export const state = () => ({
    routes: [],
    lists: [],
    currentRoute: {},
    errors: {}
  });
  
  export const getters = {
    routes: state => state.routes,
    lists: state => state.lists,
    errors: state=> state.errors,
    currentRoute: state=> state.currentRoute
  };
  
  export  const actions = {
    async getAllRoutes({ commit }, pages) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: ROUTE_BY_LIMIT_PAGE,
                variables: pages
            });
            let res = data.data.getRoutesByLimitAndPage;
            commit('SET_ROUTE',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async getListRoutes({ commit }, status) {
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: GET_ALL_ROUTES,
                variables: status
            });
            let res = data.data.getAllRoutes;
            commit('SET_LIST_ROUTE',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async newRoute({
        commit 
    }, inputData) {
      try{
        let apolloClient = this.app.apolloProvider.defaultClient;
        let data = await apolloClient.mutate({
            mutation: CREATE_NEW_ROUTE,
            variables: inputData
        });
        if(data) {
            Toast.fire({
                type: 'success',
                title: 'Route added successfully'
            });
            commit('ADD_ROUTE',data.data.createNewRoute)
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
    async getRouteById({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.query({
                query: ROUTE_BY_ID,
                variables: { id: id }
            });
            let res = data.data.getRouteById;
            commit('SET_CURRENT_ROUTE',res);
            return res;
        } catch (err) {
          console.log(err.message.split(': ')[1]);
        }
    },
    async updateRoute({ commit }, inputData){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: EDIT_ROUTE_BY_ID,
                variables: inputData
            });
            let res = data.data.editRouteByID;
            if(res){
                commit('UPDATE_ROUTE',res);
                Toast.fire({
                    type: 'success',
                    title: 'Route updated successfully'
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
    async deleteRoute({ commit }, id){
        try {
            let apolloClient = this.app.apolloProvider.defaultClient;
            let data = await apolloClient.mutate({
                mutation: DELETE_ROUTE_BY_ID,
                variables: { id: id }
            });
            let res = data.data.deleteRouteById;
            if(res.success){
                Toast.fire({
                    type: 'success',
                    title: 'Route deleted successfully'
                });
                commit('DELETE_ROUTE',res);
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
    SET_ROUTE(state, payload) {
        state.routes = payload.routes;
    },
    SET_LIST_ROUTE(state, payload) {
        state.lists = payload;
    },
    ADD_ROUTE(state, payload) {
        state.routes.unshift(payload);
    },
    SET_CURRENT_ROUTE(state, payload) {
        state.currentRoute =  payload
    },
    UPDATE_ROUTE(state, payload){
        let index = state.routes.findIndex(route => route.id == payload.id);
        let dt = state.routes;
        if(index >= 0){
            dt[index].name = payload.name;
            dt[index].descriptions = payload.descriptions;
            dt[index].active = payload.active;
        }
    },
    DELETE_ROUTE(state, payload){
        let id = payload.id;
        if(id){
            let index = state.routes.findIndex(route => route.id === payload.id);
            state.routes.splice(index, 1);
        }
    },
    SET_ERROR(state, payload){
        state.errors = payload;
    },
    REFRESH_ERROR(state){
          state.errors = {}
    }
  };
  
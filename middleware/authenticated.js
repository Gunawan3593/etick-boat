export default async function ({ app, redirect }) {
  await app.store.dispatch('auth/getAuthUser');
  if(!app.store.state.auth.authStatus){
    return redirect('/auth/login')
  }
}
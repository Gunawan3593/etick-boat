export default async function ({ app, redirect }) {
  await app.store.dispatch('auth/getAuthUser');
  if(app.store.state.auth.authStatus){
    if(app.store.state.auth.user.role == 1){
      return redirect('/admin/dashboard')
    }else{
      return redirect('/')
    }
  }
}
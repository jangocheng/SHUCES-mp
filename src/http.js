/* eslint-disable */
import Fly from 'flyio/dist/npm/wx'
// var Fly = require('flyio/dist/npm/wx')
import store from './store/index'
var http = new Fly()
console.log('process', __SERVER)
if (__SERVER === 'local') {
  http.config.baseURL = 'http://localhost:5000'
} else if (__SERVER === 'prod') {
  http.config.baseURL = 'https//api.shuhelper.cn/v1'
} else {
  http.config.baseURL = 'http://api-dev.shuhelper.cn/v1'
}
// http.config.baseURL = 'https://api.shuhelper.cn/v1'
// function redirectToLogin(authID) {
//   wx.redirectTo({
//     url: `/pages/login/main?authID=${authID}`
//   })
// }

// function reAuth() {
//   wx.login({
//     success: res => {
//       http
//         .get(`/auth/mp/app?code=${res.code}&source=shuhelper_mp_app`)
//         .then(response => {
//           redirectToLogin(response.data.authID)
//         })
//         .catch(err => {
//           redirectToLogin(err.response.data.authID)
//         })
//     }
//   })
// }
// var needAuth = false
var loading = false
http.interceptors.response.use(
  response => {
    // Do something with response data .
    // Just return the data field of response
    return response.data
  },
  err => {
    // console.log(store.state.user)
    if (err.response.status === 401 && !loading) {
      // console.log(err.response)
      // store.dispatch('login')
      // store.commite('needAuth')
      this.loading = true
      wx.navigateTo({
        url: '/pages/login/main',
        success: () => {
          loading = false
        }
      })
      // wx.naviga
    }
    // Do something with response error
    return err
  }
)

export default http

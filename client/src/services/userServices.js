import Api from './api'

export default {
 test: function(token, type) {
     return Api().post(`/signUp`, {token: token})
 }
}
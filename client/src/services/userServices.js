import Api from './api'

export default {
    getUserData: (id) => {
        return Api().get(`/user/user/${id}`)
    }
}
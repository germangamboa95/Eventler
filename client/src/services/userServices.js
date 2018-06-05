import Api from './api'

export default {
    getUserData: (id) => {
        return Api().get(`/user/user/${id}`)
    },
    updateUserData: (id, data) => {
        return Api().post(`/user/finishSignUp/${id}`,{data})
    },
    loadOwnedEvents: (id) => {
        return Api().get(`event/managed/events/get/${id}`)
    }
}
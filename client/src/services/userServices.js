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
    },
    createNewEvent: (id, data) => {
        return Api().post('event/managed/create/event', data)
    },
    loadEventData: (id) => {
        return Api().get(`event/get/event/${id}`)
    },
    newUserForEvent: (data) => {
        return Api().post('/user/user/new', data)
    },
    signUpForEvent: (event_id, user_id) => {
        return Api().post('event/attend/event', {event_id, user_id})
    }
}
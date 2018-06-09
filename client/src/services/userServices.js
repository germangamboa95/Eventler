import Api from './api'

export default {
    getUserData: (id) => {
        return Api().get(`user/user/${id}`)
    },
    updateUserData: (id, data) => {
        return Api().post(`user/finishSignUp/${id}`,{data})
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
        return Api().post('user/user/new', data)
    },
    signUpForEvent: (event_id, user_id) => {
        return Api().post('event/attend/event', {event_id, user_id})
    },
    approveAttendee: (event_id, user_id) => {
        return Api().post('event/managed/events/approve', {event_id, user_id})
    },
    revokeAttendee: (event_id, user_id) => {
        return Api().post('event/managed/events/revoke', {event_id, user_id})
    },
    sendSingleEmail: (data) => {
        return Api().post('coms/email/single', data)
    },
    sendManyEmail: (data) => {
        return Api().post('coms/email/send', data)
    },
    sendConfirm: (id, e_name) => {
        return Api().post('coms/email/send/confirm/signup', {_id: id, event_name: e_name})
    },
    checkIn: (user_id, event_id) => {
        return Api().post('event/event/checkin', {user_id, event_id})
    }
}
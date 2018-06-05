const localStore = window.localStorage;

export default {
    saveToken: (token) => localStore.setItem('token', token),
    useToken: () => localStore.getItem('token'),
    saveId: (id) => localStore.setItem('id', id),
    useId: () => localStore.getItem('id'),
    clear: () => localStore.clear(),
    saveState: (state) => localStore.setItem('complete', state),
    getState: () => localStore.getItem('complete')
}
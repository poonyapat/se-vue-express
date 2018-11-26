import Api from './api'

export default {
    authenticate(credential) {
        return Api().post('login', credential)
    },

    register(userData) {
        return Api().post('register', userData)
    },

    findOne(username) {
        return Api().get('user', {
            params: {
                username: username
            }
        })
    },
    
    update(username,userData) {
        return Api().post('update', {
             username : username,
             userData :userData}
            )
    },

    findUsernames(query) {
        return Api().get('user/suggest', {
            params: {
                query: query
            }
        })
    }
}
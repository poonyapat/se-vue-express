import Api from './api'

export default {
    findAll(queryObject) {
        return Api().get('task/watcher/all', {
            params: queryObject
        })
    },
}
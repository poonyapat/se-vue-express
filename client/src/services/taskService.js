import Api from '@/services/api'

export default {
    findAll(queryObject) {
        return Api().get('tasks', {
            params: queryObject
        })
    }
}
import Api from '@/services/api'

export default {
    create(taskData) {
        return Api().post('task/create', taskData)
    },
    findAll(queryObject) {
        return Api().get('tasks', {
            params: queryObject
        })
    },
    fineOne(id){
        return Api().get('task', {
            params: { id: id }
        })
    }
}
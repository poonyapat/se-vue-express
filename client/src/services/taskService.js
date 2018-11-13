import Api from './api'

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
    },
    update(id, data) {
        return Api().post('task/update', {
            id: id,
            data: data
        })
    },
    remove(id) {
        return Api().post('task/delete', {
            id: id
        })
    }
}
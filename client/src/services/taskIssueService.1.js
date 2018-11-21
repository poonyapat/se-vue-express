import Api from './api'

export default {
    create(taskIssue) {
        return Api().post('task/issue/create', taskIssue)
    },
    findAll(queryObject) {
        return Api().get('projects', {
            params: queryObject
        })
    },

    countAll(ids) {
        return Api().get('task/issue/count', {
            params: { ids: ids  }
        })
    }
}
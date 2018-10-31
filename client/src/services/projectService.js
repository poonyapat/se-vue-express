import Api from '@/services/api'

export default {

    create(projectData) {
        return Api().post('project/create', projectData)
    },
  

    findAll(queryObject) {
        return Api().get('projects', {
            params: queryObject
        })
    }
}
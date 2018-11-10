import Api from '@/services/api'
export default {

    create(projectData) {
        return Api().post('project/create', projectData)
    },
    addMember(members){
        return Api().post('project/addMember',members)
    },
    findAll(queryObject) {
        return Api().get('projects', {
            params: queryObject
        })
    },

    findOne(id) {
        return Api().get('project', {
            params: { id: id  }
        })
    }
}
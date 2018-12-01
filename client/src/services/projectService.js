import Api from './api'
export default {

    create(projectData) {
        return Api().post('project/create', projectData)
    },
    addMember(members){
        return Api().post('project/addMember',members)
    },
    removeMember(member){
        return Api().post('project/removeMember',member)
    },
    findAll(queryObject) {
        return Api().get('projects', {
            params: queryObject
        })
    },
    findAllUserHaveAnotherProject(queryObject){
        return Api().get('projects/onlyUserLive', {
            params: queryObject})
    },

    hasPermission(projectId, username) {
        return Api().get('project/permission', {
            params: {
                username: username,
                projectId: projectId
            }
        })
    },

    findOne(id) {
        return Api().get('project', {
            params: { id: id  }
        })
    },
    update(project) {
        return Api().post('project/update', project)
    }
}
module.exports = (sequelize, DataTypes) => {
    const TaskWatcher = sequelize.define('TaskWatcher', {
        status: {
            type: DataTypes.ENUM('ToDo','OnGoing', 'Done', 'Cancelled'),
            allowNull: false
        }
    })
    const Task = sequelize.import('./task')
    TaskWatcher.belongsTo(Task, { foreignKey: 'taskId' })
    const Project = sequelize.import('./project')
    TaskWatcher.belongsTo(Project, {foreignKey: 'projectId'})
    return TaskWatcher
}
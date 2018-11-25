module.exports = (sequelize, DataTypes) => {
    const TaskIssue = sequelize.define('TaskIssue', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Reported', 'Analyzing', 'Complete', 'Cancelled', 'Ignore'),
            defaultValue: 'Reported'
        }
    })

    const User = sequelize.import('./user')
    TaskIssue.belongsTo(User, { foreignKey: 'reporterUsername' })
    const Task = sequelize.import('./task')
    TaskIssue.belongsTo(Task, { foreignKey: 'taskId' })
    const Project = sequelize.import('./project')
    TaskIssue.belongsTo(Project, {foreignKey: 'projectId'})
    return TaskIssue
}
module.exports = (sequelize, DataTypes) => {
    const TaskIssue = sequelize.define('TaskIssue', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    })

    const User = sequelize.import('./user')
    TaskIssue.belongsTo(User, { foreignKey: 'reporterUsername' })
    const Task = sequelize.import('./task')
    TaskIssue.belongsTo(Task, { foreignKey: 'taskId'})
    return TaskIssue
}
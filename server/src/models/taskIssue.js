module.exports = (sequelize, DataTypes) => {
    const TaskIssue = sequelize.define('TaskIssue', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    })

    const User = sequelize.import('./user')
    TaskIssue.belongsTo(User, { foreignKey: { primaryKey: true, name: 'username' } })
    const Task = sequelize.import('./task')
    TaskIssue.belongsTo(Task, { foreignKey: { primaryKey: true, name: 'taskId' } })
    TaskIssue.removeAttribute('id')
    return TaskIssue
}
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        finishDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('ToDo', 'OnGoing', 'Done', 'Cancelled'),
            defaultValue: 'ToDo'
        },
        estimatedCost: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        parent: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sprint: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })

    const User = sequelize.import('./user')
    Task.belongsTo(User, {
        foreignKey: 'username'
    }) // person in charge
    const Project = sequelize.import('./project')
    Task.belongsTo(Project, {
        foreignKey: 'projectId'
    })
    return Task
}
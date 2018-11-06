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
        finishDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('ToDo','OnGoing','Done','Analyzing','Cancel','Designing'),
            allowNull: false
        },
        estimatedCost: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        children: {
            //old
            // type: DataTypes.ARRAY(DataTypes.STRING),
            // allowNull: false
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
    })

    const User = sequelize.import('./user')
    Task.belongsTo(User, {foreignKey: 'username'}) // person in charge
    const Project = sequelize.import('./project')
    Task.belongsTo(Project, {foreignKey: 'projectId'})
    return Task
}
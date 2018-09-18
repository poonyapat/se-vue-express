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
            type: DataTypes.ENUM('ToDo','OnGoing','Done','Analyzing','Designing'),
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
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    })

    const User = sequelize.import('./user')
    Task.belongsTo(User, {foreignKey: 'username'}) // person in charge
    return Task
}
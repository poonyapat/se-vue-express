module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tasks: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        members: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Close', 'Open'),
            allowNull: false
        },
    
    })

    const User = sequelize.import('./user')
    Project.belongsTo(User, { foreignKey: 'username' })
    return Project
}
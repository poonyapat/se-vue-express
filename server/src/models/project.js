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
        members: {
            type: DataTypes.ARRAY(DataTypes.STRING),          
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Close', 'Open'),
            allowNull: false
        },
        dateLine: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })

    const User = sequelize.import('./user')
    Project.belongsTo(User, { foreignKey: 'username' })
    return Project
}
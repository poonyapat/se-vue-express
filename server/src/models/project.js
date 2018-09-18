module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tasks: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        member: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    })

    const User = sequelize.import('./user')
    Project.belongsTo(User, { foreignKey: 'username' })
    return Project
}
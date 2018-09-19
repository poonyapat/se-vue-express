const bcrypt = require('bcryptjs')

async function hashPassword(user, options) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.setDataValue('password', hash)
        })
    })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatarURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        skills: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    })
    
    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password)
    }
    
    return User
}
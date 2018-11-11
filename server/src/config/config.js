module.exports = {
    port: process.env.PORT || '8081',
    db: {
        database: process.env.DB_NAME || 'se_project_test',
        user: process.env.DB_USER || 'poony',
        password: process.env.DB_PASSWORD || 'password',
        options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
            port: process.env.PORT || '5432'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
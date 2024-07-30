module.exports = {
    // development: {
    //     username: 'root',
    //     password: 'yue123!@KAI',
    //     database: 'node',
    //     host: '8.130.106.155',
    //     port: 3306,
    //     dialect: 'mysql',
    //     timezone: 'Asia/Shanghai'  // UTC time zone
    //
    // }

    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        timezone: process.env.DB_TIMEZONE
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        timezone: process.env.DB_TIMEZONE
    }
};
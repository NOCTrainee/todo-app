import 'dotenv/config';
// console.log(process.env.DB_NAME);

export default {
  development: {
    client: "pg",

    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },

    migrations: {
      directory: "./db/migrations"
    }
  }
};

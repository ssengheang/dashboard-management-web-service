require("dotenv").config();

const isLocal = process.env.RUN_MODE === 'local';

module.exports = {
  "development": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "dialect": "postgres",
    "dialectOptions": isLocal ? {} :{
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  "test": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "dialect": "postgres",
    "dialectOptions": isLocal ? {} :{
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  "production": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "dialect": "postgres",
    "dialectOptions": isLocal ? {} : {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
}
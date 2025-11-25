const { Sequelize } = require("sequelize");

// Password contains an '@' so encode it as '%40'. Use the `postgres://` scheme.
require('dotenv').config();
// Usar variable de entorno `DATABASE_URL` si está disponible, si no usar la cadena por defecto
const CADENA_CONEXION = process.env.DATABASE_URL || "postgres://postgres:asuna%403101@localhost:5432/postgres";

const sequelize = new Sequelize(CADENA_CONEXION, {
  logging: false // desactiva logs de SQL en consola
});

module.exports = sequelize;

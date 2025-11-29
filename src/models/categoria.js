import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Categoria = sequelize.define("categorias", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
  timestamps: false,
  freezeTableName: true
});

export default Categoria
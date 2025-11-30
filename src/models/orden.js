import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Usuario from "./user.js";


const Orden = sequelize.define("ordenes", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  metodoPago: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
   estadoPago: {
    type: DataTypes.ENUM("pendiente", "pagado"),
    allowNull: false,
    defaultValue: "pendiente",
  },
  direccionEnvio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true
});

// Relación: una orden pertenece a un usuario
Orden.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Usuario.hasMany(Orden, { foreignKey: "usuarioId", as: "ordenes" });

export default Orden;

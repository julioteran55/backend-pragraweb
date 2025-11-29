import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Categoria from "./categoria.js";

const Producto = sequelize.define("productos", {
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
  presentacion: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
   categoriaId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "categorias",   // nombre literal de la tabla
      key: "id"
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

// Asociaciones
Producto.belongsTo(Categoria, { foreignKey: "categoriaId" });
Categoria.hasMany(Producto, { foreignKey: "categoriaId" });

export default Producto

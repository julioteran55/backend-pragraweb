import Orden from "../models/orden.js";
import Usuario from "../models/user.js";
import Producto from "../models/producto.js";
import OrdenProducto from "../models/OrdenProducto.js";

export const createOrden = async (req, res) => {
  try {
    const { usuarioId, productos } = req.body; 
    // productos = [{ productoId, cantidad, precioUnitario }]
    const orden = await Orden.create({ usuarioId, total: 0 });

    let total = 0;
    for (const p of productos) {
      await OrdenProducto.create({
        ordenId: orden.id,
        productoId: p.productoId,
        cantidad: p.cantidad,
        precioUnitario: p.precioUnitario
      });
      total += p.cantidad * p.precioUnitario;
    }

    orden.total = total;
    await orden.save();

    res.status(201).json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.findAll({
      include: [
        { model: Usuario, as: "usuario" },
        { model: Producto, as: "productos" }
      ]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const ordenController = {getOrdenes,createOrden}
export default ordenController
import Orden from "../models/orden.js";
import OrdenProducto from "../models/OrdenProducto.js";
class OrdenRepository {

  async crearOrden(usuarioId, total) {
    return await Orden.create({ usuarioId, total });
  }

  async agregarProductoAOrden(ordenId, productoId, cantidad, precioUnitario) {
    return await OrdenProducto.create({
      ordenId,
      productoId,
      cantidad,
      precioUnitario
    });
  }

  async obtenerOrdenesPorUsuario(usuarioId) {
    return await Orden.findAll({
      where: { usuarioId },
      include: "productos"
    });
  }

  async obtenerOrdenPorId(ordenId) {
    return await Orden.findByPk(ordenId, {
      include: "productos"
    });
  }
}

export default new OrdenRepository();

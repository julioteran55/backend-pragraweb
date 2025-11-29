import Carrito from "../models/CarritoDeCompra.js";
import ItemCarrito from "../models/ItemDeCarrito.js";
import Producto from "../models/producto.js";

class CarritoRepository {

  async obtenerCarritoPorUsuario(usuarioId) {
    return await Carrito.findOne({
      where: { idUsuario: usuarioId },
      include: {
        model: ItemCarrito,
        include: [Producto]
      }
    });
  }

  async crearCarrito(usuarioId) {
    return await Carrito.create({ idUsuario: usuarioId });
  }

  async agregarItem(carritoId, productoId, cantidad = 1) {
    // Si ya existe el item, solo sumar cantidad
    const item = await ItemCarrito.findOne({
      where: { CarritoId: carritoId, ProductoId: productoId }
    });

    if (item) {
      item.cantidad += cantidad;
      return await item.save();
    }

    return await ItemCarrito.create({
      CarritoId: carritoId,
      ProductoId: productoId,
      cantidad
    });
  }

  async actualizarItem(itemId, cantidad) {
    return await ItemCarrito.update(
      { cantidad },
      { where: { id: itemId } }
    );
  }

  async eliminarItem(itemId) {
    return await ItemCarrito.destroy({ where: { id: itemId } });
  }

  async vaciarCarrito(carritoId) {
    return await ItemCarrito.destroy({ where: { CarritoId: carritoId } });
  }
}

export default new CarritoRepository();

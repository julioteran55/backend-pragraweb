import carritoRepository from "../repositories/carritoRepository.js";
import ordenRepository from "../repositories/ordenRepository.js";

class OrdenController {

  // Crear orden desde el carrito
  async crearOrden(req, res) {
    try {
      const usuarioId = req.user.id;

      // Obtener carrito con items
      const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);

      if (!carrito || carrito.items_carritos.length === 0) {
        return res.status(400).json({ error: "El carrito está vacío" });
      }

      // Calcular total
      let total = 0;
      carrito.items_carritos.forEach(item => {
        total += item.cantidad * item.producto.precio;
      });

      // Crear orden
      const orden = await ordenRepository.crearOrden(usuarioId, total);

      // Agregar productos a orden_producto
      for (const item of carrito.items_carritos) {
        await ordenRepository.agregarProductoAOrden(
          orden.id,
          item.producto.id,
          item.cantidad,
          item.producto.precio
        );
      }

      // Vaciar carrito
      await carritoRepository.vaciarCarrito(carrito.id);

      return res.json({ message: "Orden creada", orden });

    } catch (error) {
      console.error("Error al crear orden:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  // Obtener todas las órdenes del usuario autenticado
  async obtenerOrdenes(req, res) {
    try {
      const usuarioId = req.user.id;

      const ordenes = await ordenRepository.obtenerOrdenesPorUsuario(usuarioId);

      return res.json(ordenes);

    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  // Obtener una orden específica
  async obtenerOrdenPorId(req, res) {
    try {
      const { ordenId } = req.params;

      const orden = await ordenRepository.obtenerOrdenPorId(ordenId);

      if (!orden) {
        return res.status(404).json({ error: "Orden no encontrada" });
      }

      return res.json(orden);

    } catch (error) {
      console.error("Error al obtener orden:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }
}

export default new OrdenController();

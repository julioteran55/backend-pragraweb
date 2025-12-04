import carritoRepository from "../repositories/carritoCompra.repository.js";
import ordenRepository from "../repositories/orden.repository.js";
import Orden from "../models/orden.js";

class OrdenController {

  // Crear orden desde el carrito
  async crearOrden(req, res) {
    try {
      const usuarioId = req.user.userId;
      const { direccionEnvio } = req.body;

      if (!direccionEnvio) {
        return res.status(400).json({ error: "La dirección de envío es obligatoria" });
      }

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

      // Crear orden con dirección de envío incluida
      const orden = await ordenRepository.crearOrden(usuarioId, total, direccionEnvio);

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
      const usuarioId = req.user.userId;

      const ordenes = await ordenRepository.obtenerOrdenesPorUsuario(usuarioId);

      return res.json(ordenes);

    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  async obtenerOrdenesPorUsuario(req, res) {
    try {
      const usuarioId = req.params.id;

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

  // Actualizar dirección de envío
  async actualizarDireccion(req, res) {
    try {
      const { ordenId } = req.params;
      const { direccionEnvio } = req.body;

      if (!direccionEnvio) {
        return res.status(400).json({ error: "La dirección de envío es obligatoria" });
      }

      const orden = await Orden.findByPk(ordenId);

      if (!orden) {
        return res.status(404).json({ error: "Orden no encontrada" });
      }

      orden.direccionEnvio = direccionEnvio;
      await orden.save();

      return res.json({
        message: "Dirección actualizada correctamente",
        orden,
      });

    } catch (error) {
      console.error("Error al actualizar dirección:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  // Confirmar pago → cambia estadoPago a "pagado"
  async confirmarPago(req, res) {
    try {
      const { ordenId } = req.params;

      const orden = await Orden.findByPk(ordenId);

      if (!orden) {
        return res.status(404).json({ error: "Orden no encontrada" });
      }

      if (orden.estadoPago === "pagado") {
        return res.status(400).json({ error: "La orden ya está pagada" });
      }

      orden.estadoPago = "pagado";
      await orden.save();

      return res.json({
        message: "Pago confirmado. Orden marcada como pagada.",
        orden,
      });

    } catch (error) {
      console.error("Error al confirmar pago:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  async listarOrdenes(req, res) {
    try {
      // 1. Obtener todas las órdenes de la base de datos
      const ordenes = await Orden.findAll(); // Usar 'await' es crucial

      // 2. Devolver la lista de órdenes
      return res.json(ordenes);

    } catch (error) {
      console.error("Error al listar órdenes:", error); // Mensaje de error más específico
      return res.status(500).json({ error: "Error interno" });
    }}

}

export default new OrdenController();


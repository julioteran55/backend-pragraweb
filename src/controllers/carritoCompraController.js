import carritoRepository from "../repositories/carritoRepository.js";
import Producto from "../models/producto.js";

class CarritoController {

  // Obtener carrito del usuario autenticado
  async obtenerCarrito(req, res) {
    try {
      const usuarioId = req.user.id;

      let carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);

      // Si no existe, lo creamos vacío
      if (!carrito) {
        carrito = await carritoRepository.crearCarrito(usuarioId);
      }

      return res.json(carrito);

    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  // Agregar item al carrito
  async agregarItem(req, res) {
    try {
      const usuarioId = req.user.id;
      const { productoId, cantidad } = req.body;

      if (!productoId) {
        return res.status(400).json({ error: "productoId es requerido" });
      }

      // Verificar que el producto exista
      const producto = await Producto.findByPk(productoId);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      // Verificar/crear carrito
      let carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);

      if (!carrito) {
        carrito = await carritoRepository.crearCarrito(usuarioId);
      }

      // Agregar item
      const item = await carritoRepository.agregarItem(
        carrito.id,
        productoId,
        cantidad || 1
      );

      return res.json({ message: "Item agregado", item });

    } catch (error) {
      console.error("Error al agregar item:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  // Actualizar cantidad de un item del carrito
  async actualizarItem(req, res) {
    try {
      const { itemId } = req.params;
      const { cantidad } = req.body;

      if (cantidad <= 0) {
        return res.status(400).json({ error: "Cantidad inválida" });
      }

      await carritoRepository.actualizarItem(itemId, cantidad);

      return res.json({ message: "Cantidad actualizada" });

    } catch (error) {
      console.error("Error al actualizar item:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  // Eliminar un item del carrito
  async eliminarItem(req, res) {
    try {
      const { itemId } = req.params;

      await carritoRepository.eliminarItem(itemId);

      return res.json({ message: "Item eliminado" });

    } catch (error) {
      console.error("Error al eliminar item:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }

  // Vaciar carrito
  async vaciarCarrito(req, res) {
    try {
      const usuarioId = req.user.id;

      const carrito = await carritoRepository.obtenerCarritoPorUsuario(usuarioId);

      if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

      await carritoRepository.vaciarCarrito(carrito.id);

      return res.json({ message: "Carrito vaciado" });

    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  }
}

export default new CarritoController();

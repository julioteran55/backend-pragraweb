import productoRepository from "../repositories/producto.repository.js";

export const createProducto = async (req, res) => {
  try {
    const nuevoProducto = await productoRepository.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductos = async (req, res) => {
  try {
    const productos = await productoRepository.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductos = async (req,res) => {
try {
    const productos = await productoRepository.update(req.params.id,req.body);
    res.json({message : "Producto actualizado correctamente"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteProductos = async (req,res) => {
try {
    const productos = await productoRepository.delete(req.params.id,req.body);
    res.json({message : "Producto eliminado correctamente"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const productoController = {getProductos,createProducto , updateProductos , deleteProductos}
export default productoController 

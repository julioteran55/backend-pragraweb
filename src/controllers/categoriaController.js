import categoriaRepository from "../repositories/categoria.repository.js";

const crearCategoria = async (req,res) =>{
  try {
    const nuevaCategoría = await categoriaRepository.create(req.body);
    res.status(201).json(nuevaCategoría);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const editarCategoria = async (req,res) =>{
  try {
    const nuevaCategoría = await categoriaRepository.update(req.params.id,req.body);
    res.status(201).json({message : "Categoria actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const listarCategoria = async (req,res) =>{
  try {
    const nuevaCategoría = await categoriaRepository.findAll();
    res.status(201).json(nuevaCategoría);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const eliminarCategoria = async (req,res) =>{
  try {
    const nuevaCategoría = await categoriaRepository.delete(req.params.id);
    res.status(201).json({message : "Categoría eliminada exitosamente"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const categoriaController = {eliminarCategoria,crearCategoria,editarCategoria,listarCategoria}
import RepositoryBase from "./RepositoryBase.js";
import Categoria from "../models/categoria.js";

const categoriaRepository = new RepositoryBase(Categoria);

export default categoriaRepository;
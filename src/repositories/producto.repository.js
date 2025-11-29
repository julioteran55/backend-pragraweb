import RepositoryBase from "./RepositoryBase.js";
import Producto from "../models/producto.js";
import Categoria from "../models/categoria.js";

class ProductoRepository extends RepositoryBase {
    constructor() {
        super(Producto);
    }

    async create(entity) {
        try {
            // Validación opcional
            if (entity.categoriaId) {
                const categoria = await Categoria.findByPk(entity.categoriaId);

                if (!categoria) {
                    return {
                        message: "La categoría especificada no existe"
                    };
                }
            }

            const producto = await this.model.create(entity);

            return {
                data: producto
            };

        } catch (error) {
            console.log(error);
            return {
                message: "Error al crear el producto",
                detail: error.message
            };
        }
    }
}

export default new ProductoRepository();

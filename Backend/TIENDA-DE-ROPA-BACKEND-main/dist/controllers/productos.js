"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const producto_1 = __importDefault(require("../models/producto"));
class ProductosController {
    getProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield producto_1.default.findAll();
            if (productos) {
                res.json(productos);
            }
            else {
                res.status(404).json({ msg: 'Base de datos vacía' });
            }
        });
    }
    getProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const producto = yield producto_1.default.findByPk(id);
            if (producto) {
                res.json(producto);
            }
            else {
                res.status(404).json({ msg: `No existe un producto con el id ${id}` });
            }
        });
    }
    postProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const producto = yield producto_1.default.create(body);
                res.json(producto);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    putProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const producto = yield producto_1.default.findByPk(id);
                if (!producto) {
                    return res.status(404).json({ msg: 'No existe un producto con el id ' + id });
                }
                yield producto.update(body);
                res.json(producto);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const producto = yield producto_1.default.findByPk(id);
            if (!producto) {
                return res.status(404).json({ msg: 'No existe un producto con el id ' + id });
            }
            yield producto.destroy();
            res.json({ msg: 'Producto eliminado correctamente' });
        });
    }
}
exports.default = new ProductosController();
//# sourceMappingURL=productos.js.map
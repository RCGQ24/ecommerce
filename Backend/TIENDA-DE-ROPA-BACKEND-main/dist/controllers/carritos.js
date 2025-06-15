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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carrito_1 = __importDefault(require("../models/carrito"));
const detalle_carrito_1 = __importDefault(require("../models/detalle_carrito"));
const producto_1 = __importDefault(require("../models/producto"));
class CarritosController {
    getCarritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const carritos = yield carrito_1.default.findAll();
            if (carritos) {
                res.json(carritos);
            }
            else {
                res.status(404).json({ msg: 'Base de datos vacía' });
            }
        });
    }
    getCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                let carrito = yield carrito_1.default.findOne({ where: { id_usuario: id } });
                if (!carrito) {
                    carrito = yield carrito_1.default.create({ id_usuario: id });
                    return res.json({ id: carrito.id, id_usuario: id, items: [] });
                }
                // Buscar detalles del carrito
                const detalles = yield detalle_carrito_1.default.findAll({ where: { id_carrito: carrito.id } });
                // Obtener todos los productos relacionados
                const productosIds = detalles.map(det => det.id_producto);
                const productos = yield producto_1.default.findAll({ where: { id: productosIds } });
                // Combinar detalles con info de producto
                const items = detalles.map(det => {
                    const prod = productos.find(p => String(p.id) === String(det.id_producto));
                    return {
                        id: det.id_producto,
                        name: prod ? prod.nombre_producto : '',
                        price: prod ? prod.precio : 0,
                        image: prod ? prod.url_imagen : '',
                        quantity: det.cantidad
                    };
                });
                res.json({ id: carrito.id, id_usuario: id, items });
            }
            catch (error) {
                console.log('Error en getCarrito:', error);
                res.status(500).json({ msg: 'Error interno en getCarrito', error });
            }
        });
    }
    postCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const carrito = yield carrito_1.default.create(body);
                res.json(carrito);
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    putCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _a = req.body, { items } = _a, carritoData = __rest(_a, ["items"]);
            try {
                // Buscar el carrito por id_usuario
                let carrito = yield carrito_1.default.findOne({ where: { id_usuario: id } });
                if (!carrito) {
                    carrito = yield carrito_1.default.create({ id_usuario: id });
                }
                yield carrito.update(carritoData);
                const carritoId = carrito.id;
                // Sincronizar detalles del carrito
                if (Array.isArray(items)) {
                    // Obtener detalles actuales
                    const detallesActuales = yield detalle_carrito_1.default.findAll({ where: { id_carrito: carritoId } });
                    const productosActuales = detallesActuales.map(d => d.id_producto);
                    const productosNuevos = items.map(i => i.id);
                    // Eliminar productos que ya no están
                    for (const detalle of detallesActuales) {
                        if (!productosNuevos.includes(detalle.id_producto)) {
                            yield detalle.destroy();
                        }
                    }
                    // Agregar o actualizar productos
                    for (const item of items) {
                        const detalleExistente = detallesActuales.find(d => d.id_producto === item.id);
                        if (detalleExistente) {
                            // Actualizar cantidad
                            yield detalleExistente.update({ cantidad: item.quantity });
                        }
                        else {
                            // Crear nuevo detalle
                            const producto = yield producto_1.default.findByPk(item.id);
                            yield detalle_carrito_1.default.create({
                                id_carrito: carritoId,
                                id_producto: item.id,
                                cantidad: item.quantity,
                                precio: producto ? producto.precio : 0 // precio unitario actual
                            });
                        }
                    }
                }
                res.json({ msg: 'Carrito y detalles actualizados' });
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deleteCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const carrito = yield carrito_1.default.findByPk(id);
            if (!carrito) {
                return res.status(404).json({ msg: `No existe un carrito con el id ${id}` });
            }
            yield carrito.destroy();
            res.json({ msg: 'Carrito eliminado' });
        });
    }
}
exports.default = new CarritosController();
//# sourceMappingURL=carritos.js.map
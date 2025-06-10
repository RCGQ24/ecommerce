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
const detalle_carrito_1 = __importDefault(require("../models/detalle_carrito"));
class DetalleCarritosController {
    getDetalleCarritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const detalles = yield detalle_carrito_1.default.findAll();
            if (detalles) {
                res.json(detalles);
            }
            else {
                res.status(404).json({ msg: 'Base de datos vacía' });
            }
        });
    }
    getDetalleCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detalle = yield detalle_carrito_1.default.findByPk(id);
            if (detalle) {
                res.json(detalle);
            }
            else {
                res.status(404).json({ msg: `No existe un detalle de carrito con el id ${id}` });
            }
        });
    }
    postDetalleCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const detalle = yield detalle_carrito_1.default.create(body);
                res.json(detalle);
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    putDetalleCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const detalle = yield detalle_carrito_1.default.findByPk(id);
                if (!detalle) {
                    return res.status(404).json({ msg: `No existe un detalle de carrito con el id ${id}` });
                }
                yield detalle.update(body);
                res.json(detalle);
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deleteDetalleCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detalle = yield detalle_carrito_1.default.findByPk(id);
            if (!detalle) {
                return res.status(404).json({ msg: `No existe un detalle de carrito con el id ${id}` });
            }
            yield detalle.destroy();
            res.json({ msg: 'Detalle de carrito eliminado' });
        });
    }
}
exports.default = new DetalleCarritosController();
//# sourceMappingURL=detalle_carritos.js.map
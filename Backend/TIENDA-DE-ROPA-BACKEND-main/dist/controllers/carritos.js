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
const carrito_1 = __importDefault(require("../models/carrito"));
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
            const carrito = yield carrito_1.default.findByPk(id);
            if (carrito) {
                res.json(carrito);
            }
            else {
                res.status(404).json({ msg: `No existe un carrito con el id ${id}` });
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
            const { body } = req;
            try {
                const carrito = yield carrito_1.default.findByPk(id);
                if (!carrito) {
                    return res.status(404).json({ msg: `No existe un carrito con el id ${id}` });
                }
                yield carrito.update(body);
                res.json(carrito);
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
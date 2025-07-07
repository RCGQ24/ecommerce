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
const pago_1 = __importDefault(require("../models/pago"));
class PagosController {
    getPagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email_usuario } = req.query;
            let pagos;
            if (email_usuario) {
                pagos = yield pago_1.default.findAll({ where: { email_usuario } });
            }
            else {
                pagos = yield pago_1.default.findAll();
            }
            if (pagos) {
                pagos = pagos.map(p => {
                    const plain = p.toJSON();
                    plain.productos = plain.productos ? JSON.parse(plain.productos) : [];
                    return plain;
                });
                res.json(pagos);
            }
            else {
                res.status(404).json({ msg: 'Base de datos vacía' });
            }
        });
    }
    getPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pago = yield pago_1.default.findByPk(id);
            if (pago) {
                const plain = pago.toJSON();
                plain.productos = plain.productos ? JSON.parse(plain.productos) : [];
                res.json(plain);
            }
            else {
                res.status(404).json({ msg: `No existe un pago con el id ${id}` });
            }
        });
    }
    postPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const productos = body.productos ? JSON.stringify(body.productos) : '[]';
                let fecha_pago = body.fecha_pago;
                if (!fecha_pago) {
                    fecha_pago = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Caracas' }));
                }
                const pago = yield pago_1.default.create(Object.assign(Object.assign({}, body), { productos, fecha_pago }));
                res.json(pago);
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    putPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const pago = yield pago_1.default.findByPk(id);
                if (!pago) {
                    return res.status(404).json({ msg: `No existe un pago con el id ${id}` });
                }
                yield pago.update(body);
                res.json(pago);
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deletePago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pago = yield pago_1.default.findByPk(id);
            if (!pago) {
                return res.status(404).json({ msg: `No existe un pago con el id ${id}` });
            }
            yield pago.destroy();
            res.json({ msg: 'Pago eliminado' });
        });
    }
}
exports.default = new PagosController();
//# sourceMappingURL=pagos.js.map
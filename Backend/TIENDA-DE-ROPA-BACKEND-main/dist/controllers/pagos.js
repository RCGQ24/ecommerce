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
            const pagos = yield pago_1.default.findAll();
            if (pagos) {
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
                res.json(pago);
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
                const pago = yield pago_1.default.create(body);
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
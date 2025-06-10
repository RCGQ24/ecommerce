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
const factura_1 = __importDefault(require("../models/factura"));
class FacturasController {
    getFacturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const facturas = yield factura_1.default.findAll();
            if (facturas) {
                res.json(facturas);
            }
            else {
                res.status(404).json({ msg: 'Base de datos vacía' });
            }
        });
    }
    getFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const factura = yield factura_1.default.findByPk(id);
            if (factura) {
                res.json(factura);
            }
            else {
                res.status(404).json({ msg: `No existe una factura con el id ${id}` });
            }
        });
    }
    postFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const factura = yield factura_1.default.create(body);
                res.json(factura);
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    putFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const factura = yield factura_1.default.findByPk(id);
                if (!factura) {
                    return res.status(404).json({ msg: `No existe una factura con el id ${id}` });
                }
                yield factura.update(body);
                res.json(factura);
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deleteFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const factura = yield factura_1.default.findByPk(id);
            if (!factura) {
                return res.status(404).json({ msg: `No existe una factura con el id ${id}` });
            }
            yield factura.destroy();
            res.json({ msg: 'Factura eliminada' });
        });
    }
}
exports.default = new FacturasController();
//# sourceMappingURL=facturas.js.map
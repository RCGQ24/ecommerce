"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturas_1 = __importDefault(require("../controllers/facturas"));
const router = express_1.Router();
router.get('/', facturas_1.default.getFacturas.bind(facturas_1.default));
router.get('/:id', facturas_1.default.getFactura.bind(facturas_1.default));
router.post('/', facturas_1.default.postFactura.bind(facturas_1.default));
router.put('/:id', facturas_1.default.putFactura.bind(facturas_1.default));
router.delete('/:id', facturas_1.default.deleteFactura.bind(facturas_1.default));
exports.default = router;
//# sourceMappingURL=factura.js.map
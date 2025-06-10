"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_carritos_1 = __importDefault(require("../controllers/detalle_carritos"));
const router = express_1.Router();
router.get('/', detalle_carritos_1.default.getDetalleCarritos.bind(detalle_carritos_1.default));
router.get('/:id', detalle_carritos_1.default.getDetalleCarrito.bind(detalle_carritos_1.default));
router.post('/', detalle_carritos_1.default.postDetalleCarrito.bind(detalle_carritos_1.default));
router.put('/:id', detalle_carritos_1.default.putDetalleCarrito.bind(detalle_carritos_1.default));
router.delete('/:id', detalle_carritos_1.default.deleteDetalleCarrito.bind(detalle_carritos_1.default));
exports.default = router;
//# sourceMappingURL=detalle_carrito.js.map
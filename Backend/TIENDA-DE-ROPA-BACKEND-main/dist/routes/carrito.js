"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritos_1 = __importDefault(require("../controllers/carritos"));
const router = express_1.Router();
router.get('/', carritos_1.default.getCarritos.bind(carritos_1.default));
router.get('/:id', carritos_1.default.getCarrito.bind(carritos_1.default));
router.post('/', carritos_1.default.postCarrito.bind(carritos_1.default));
router.put('/:id', carritos_1.default.putCarrito.bind(carritos_1.default));
router.delete('/:id', carritos_1.default.deleteCarrito.bind(carritos_1.default));
exports.default = router;
//# sourceMappingURL=carrito.js.map
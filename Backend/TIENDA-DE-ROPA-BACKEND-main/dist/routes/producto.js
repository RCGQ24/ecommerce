"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = __importDefault(require("../controllers/productos"));
const router = express_1.Router();
router.get('/', productos_1.default.getProductos.bind(productos_1.default));
router.get('/:id', productos_1.default.getProducto.bind(productos_1.default));
router.post('/', productos_1.default.postProducto.bind(productos_1.default));
router.put('/:id', productos_1.default.putProducto.bind(productos_1.default));
router.delete('/:id', productos_1.default.deleteProducto.bind(productos_1.default));
exports.default = router;
//# sourceMappingURL=producto.js.map
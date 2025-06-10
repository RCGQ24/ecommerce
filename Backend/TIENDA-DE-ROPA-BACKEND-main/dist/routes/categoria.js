"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categorias_1 = __importDefault(require("../controllers/categorias"));
const router = express_1.Router();
router.get('/', categorias_1.default.getCategorias.bind(categorias_1.default));
router.get('/:id', categorias_1.default.getCategoria.bind(categorias_1.default));
router.post('/', categorias_1.default.postCategoria.bind(categorias_1.default));
router.put('/:id', categorias_1.default.putCategoria.bind(categorias_1.default));
router.delete('/:id', categorias_1.default.deleteCategoria.bind(categorias_1.default));
exports.default = router;
//# sourceMappingURL=categoria.js.map
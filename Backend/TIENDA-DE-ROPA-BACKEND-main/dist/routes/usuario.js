"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = __importDefault(require("../controllers/usuarios"));
const router = express_1.Router();
router.get('/', usuarios_1.default.getUsuarios.bind(usuarios_1.default));
router.get('/:id', usuarios_1.default.getUsuario.bind(usuarios_1.default));
router.post('/', usuarios_1.default.postUsuario.bind(usuarios_1.default));
router.put('/:id', usuarios_1.default.putUsuario.bind(usuarios_1.default));
router.delete('/:id', usuarios_1.default.deleteUsuario.bind(usuarios_1.default));
exports.default = router;
//# sourceMappingURL=usuario.js.map
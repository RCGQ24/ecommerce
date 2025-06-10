"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosmapa_1 = require("../controllers/usuariosmapa");
const router = express_1.Router();
router.get('/', usuariosmapa_1.getUsuarios);
/* router.get('/:id',    getUsuario ); */
router.post('/', usuariosmapa_1.postUsuario);
/* router.put('/:id',    putUsuario );
router.delete('/:id', deleteUsuario ); */
exports.default = router;
//# sourceMappingURL=usuariosmapa.js.map
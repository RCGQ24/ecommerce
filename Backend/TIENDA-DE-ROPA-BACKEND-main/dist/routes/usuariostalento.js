"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariostalento_1 = require("../controllers/usuariostalento");
const router = express_1.Router();
router.get('/', usuariostalento_1.getUsuarios);
/* router.get('/:id',    getUsuario ); */
router.post('/', usuariostalento_1.postUsuario);
router.post('/user', (req, res) => {
    res.send("todo lindo");
});
/* router.put('/:id',    putUsuario );
router.delete('/:id', deleteUsuario ); */
exports.default = router;
//# sourceMappingURL=usuariostalento.js.map
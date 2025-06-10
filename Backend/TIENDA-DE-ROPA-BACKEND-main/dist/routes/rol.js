"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_1 = __importDefault(require("../controllers/roles"));
const router = express_1.Router();
router.get('/', roles_1.default.getRoles.bind(roles_1.default));
router.get('/:id', roles_1.default.getRol.bind(roles_1.default));
router.post('/', roles_1.default.postRol.bind(roles_1.default));
router.put('/:id', roles_1.default.putRol.bind(roles_1.default));
router.delete('/:id', roles_1.default.deleteRol.bind(roles_1.default));
exports.default = router;
//# sourceMappingURL=rol.js.map
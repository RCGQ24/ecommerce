"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagos_1 = __importDefault(require("../controllers/pagos"));
const router = express_1.Router();
router.get('/', pagos_1.default.getPagos.bind(pagos_1.default));
router.get('/:id', pagos_1.default.getPago.bind(pagos_1.default));
router.post('/', pagos_1.default.postPago.bind(pagos_1.default));
router.put('/:id', pagos_1.default.putPago.bind(pagos_1.default));
router.delete('/:id', pagos_1.default.deletePago.bind(pagos_1.default));
exports.default = router;
//# sourceMappingURL=pago.js.map
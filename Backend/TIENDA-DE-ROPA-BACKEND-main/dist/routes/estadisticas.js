"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadisticas_1 = __importDefault(require("../controllers/estadisticas"));
const router = express_1.Router();
// Endpoint para estadísticas del panel del supervisor
router.get('/supervisor', estadisticas_1.default.getSupervisorStats);
exports.default = router;
//# sourceMappingURL=estadisticas.js.map
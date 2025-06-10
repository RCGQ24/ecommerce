"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rol_1 = __importDefault(require("../models/rol"));
class RolesController {
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield rol_1.default.findAll();
            console.log("\nbuscando roles\n total", roles.length);
            if (roles) {
                res.json(roles);
            }
            else {
                console.log("\nBase de datos vacia\n");
                res.status(404).json({ msg: `Base de datos vacia` });
            }
        });
    }
    getRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rol = yield rol_1.default.findByPk(id);
            if (rol) {
                res.json(rol);
            }
            else {
                res.status(404).json({ msg: `No existe un rol con el  id ${id}` });
            }
        });
    }
    postRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            console.log("se procede a crear Rol ", body);
            try {
                // Si tienes validación de email, mantenla, si no, puedes quitarla
                const existeEmail = yield rol_1.default.findOne({
                    where: { email: body.email }
                });
                if (existeEmail) {
                    return res.status(400).json({
                        msg: 'Ya existe un rol con el email ' + body.email
                    });
                }
                const rol = yield rol_1.default.create(body);
                setTimeout(() => {
                    console.log("estoy en set time out");
                    res.json(rol);
                }, 2000);
            }
            catch (error) {
                console.log("api postRol fallo", error);
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    putRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const rol = yield rol_1.default.findByPk(id);
                if (!rol) {
                    return res.status(404).json({
                        msg: 'No existe un rol con el id ' + id
                    });
                }
                yield rol.update(body);
                res.json(rol);
            }
            catch (error) {
                console.log("error api put rol", error);
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deleteRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json("No disponible esta API");
        });
    }
}
exports.default = new RolesController();
//# sourceMappingURL=roles.js.map
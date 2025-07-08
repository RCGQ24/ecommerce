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
const usuario_1 = __importDefault(require("../models/usuario"));
class UsuariosController {
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield usuario_1.default.findAll();
            console.log("\nbuscando usuarios\n", usuarios);
            if (usuarios) {
                res.json(usuarios);
            }
            else {
                console.log("\nBase de datos vacia\n");
                res.status(404).json({ msg: `Base de datos vacia` });
            }
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield usuario_1.default.findByPk(id);
            if (usuario) {
                res.json(usuario);
            }
            else {
                res.status(404).json({ msg: `No existe un usuario con el  id ${id}` });
            }
        });
    }
    postUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            console.log("se procede a crear usuario ", body);
            try {
                const existeEmail = yield usuario_1.default.findOne({
                    where: { email: body.email }
                });
                if (existeEmail) {
                    return res.status(400).json({
                        msg: 'Ya existe un usuario con el email ' + body.email
                    });
                }
                const usuario = yield usuario_1.default.create(body);
                setTimeout(() => {
                    console.log("estoy en set time out");
                    res.json(usuario);
                }, 2000);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    putUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const usuario = yield usuario_1.default.findByPk(id);
                if (!usuario) {
                    return res.status(404).json({
                        msg: 'No existe un usuario con el id ' + id
                    });
                }
                yield usuario.update(body);
                res.json(usuario);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield usuario_1.default.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    msg: 'No existe un usuario con el id ' + id
                });
            }
            yield usuario.update({ estado: false });
            res.json(usuario);
        });
    }
    loginUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, contrasena } = req.body;
            if (!email || !contrasena) {
                return res.status(400).json({ msg: 'Email y contraseña son requeridos' });
            }
            try {
                const usuario = yield usuario_1.default.findOne({ where: { email, contrasena } });
                if (!usuario) {
                    return res.status(401).json({ msg: 'Credenciales incorrectas' });
                }
                res.json(usuario);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Error en el servidor' });
            }
        });
    }
}
exports.default = new UsuariosController();
//# sourceMappingURL=usuarios.js.map
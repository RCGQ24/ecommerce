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
const categoria_1 = __importDefault(require("../models/categoria"));
class CategoriasController {
    getCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categorias = yield categoria_1.default.findAll();
            if (categorias) {
                res.json(categorias);
            }
            else {
                res.status(404).json({ msg: 'Base de datos vacía' });
            }
        });
    }
    getCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categoria = yield categoria_1.default.findByPk(id);
            if (categoria) {
                res.json(categoria);
            }
            else {
                res.status(404).json({ msg: `No existe una categoría con el id ${id}` });
            }
        });
    }
    postCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const categoria = yield categoria_1.default.create(body);
                res.json(categoria);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    putCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const categoria = yield categoria_1.default.findByPk(id);
                if (!categoria) {
                    return res.status(404).json({ msg: 'No existe una categoría con el id ' + id });
                }
                yield categoria.update(body);
                res.json(categoria);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deleteCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categoria = yield categoria_1.default.findByPk(id);
            if (!categoria) {
                return res.status(404).json({ msg: 'No existe una categoría con el id ' + id });
            }
            yield categoria.destroy();
            res.json({ msg: 'Categoría eliminada correctamente' });
        });
    }
}
exports.default = new CategoriasController();
//# sourceMappingURL=categorias.js.map
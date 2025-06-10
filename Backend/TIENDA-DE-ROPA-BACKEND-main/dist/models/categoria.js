"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Categoria extends sequelize_1.Model {
}
exports.Categoria = Categoria;
Categoria.init({
    nombre_categoria: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Categoria',
    timestamps: false
});
exports.default = Categoria;
//# sourceMappingURL=categoria.js.map
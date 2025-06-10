"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrito = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Carrito extends sequelize_1.Model {
}
exports.Carrito = Carrito;
Carrito.init({
    id_usuario: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Carrito',
    timestamps: false
});
exports.default = Carrito;
//# sourceMappingURL=carrito.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Rol extends sequelize_1.Model {
}
exports.Rol = Rol;
Rol.init({
    nombre_rol: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Rol',
    timestamps: false
});
exports.default = Rol;
//# sourceMappingURL=rol.js.map
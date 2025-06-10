"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Usuario extends sequelize_1.Model {
}
exports.Usuario = Usuario;
Usuario.init({
    nombre_usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING
    },
    id_rol: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Usuario',
    timestamps: false
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map
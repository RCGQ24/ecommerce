"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Producto extends sequelize_1.Model {
}
exports.Producto = Producto;
Producto.init({
    nombre_producto: {
        type: sequelize_1.DataTypes.STRING
    },
    id_categoria: {
        type: sequelize_1.DataTypes.STRING
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    },
    url_imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    talla: {
        type: sequelize_1.DataTypes.CHAR
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Producto',
    timestamps: false
});
exports.default = Producto;
//# sourceMappingURL=producto.js.map
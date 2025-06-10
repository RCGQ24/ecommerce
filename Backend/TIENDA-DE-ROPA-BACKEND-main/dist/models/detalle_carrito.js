"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleCarrito = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class DetalleCarrito extends sequelize_1.Model {
}
exports.DetalleCarrito = DetalleCarrito;
DetalleCarrito.init({
    id_carrito: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    }
}, {
    sequelize: connection_1.db,
    modelName: 'DetalleCarrito',
    timestamps: false
});
exports.default = DetalleCarrito;
//# sourceMappingURL=detalle_carrito.js.map
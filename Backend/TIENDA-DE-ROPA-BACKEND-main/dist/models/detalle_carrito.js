"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleCarrito = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const carrito_1 = __importDefault(require("./carrito"));
const producto_1 = __importDefault(require("./producto"));
class DetalleCarrito extends sequelize_1.Model {
}
exports.DetalleCarrito = DetalleCarrito;
DetalleCarrito.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_carrito: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: carrito_1.default,
            key: 'id'
        }
    },
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: producto_1.default,
            key: 'id'
        }
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    sequelize: connection_1.db,
    modelName: 'DetalleCarrito',
    tableName: 'detalle_carritos',
    timestamps: false
});
// Definir relaciones
DetalleCarrito.belongsTo(carrito_1.default, { foreignKey: 'id_carrito' });
DetalleCarrito.belongsTo(producto_1.default, { foreignKey: 'id_producto' });
exports.default = DetalleCarrito;
//# sourceMappingURL=detalle_carrito.js.map
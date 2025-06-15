"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Factura extends sequelize_1.Model {
}
exports.Factura = Factura;
Factura.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_pago: {
        type: sequelize_1.DataTypes.INTEGER
    },
    numero_factura: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    fecha_factura: {
        type: sequelize_1.DataTypes.DATE
    },
    monto_total: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2)
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100)
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Factura',
    tableName: 'facturas',
    timestamps: false
});
exports.default = Factura;
//# sourceMappingURL=factura.js.map
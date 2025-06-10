"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Factura extends sequelize_1.Model {
}
exports.Factura = Factura;
Factura.init({
    id_pago: {
        type: sequelize_1.DataTypes.INTEGER
    },
    numero_factura: {
        type: sequelize_1.DataTypes.STRING
    },
    monto_total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Factura',
    timestamps: false
});
exports.default = Factura;
//# sourceMappingURL=factura.js.map
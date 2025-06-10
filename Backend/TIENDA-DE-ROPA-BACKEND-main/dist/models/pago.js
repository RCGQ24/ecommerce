"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pago = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
class Pago extends sequelize_1.Model {
}
exports.Pago = Pago;
Pago.init({
    id_metodo_pago: {
        type: sequelize_1.DataTypes.INTEGER
    },
    monto_pago: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    },
    estado_pago: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Pago',
    timestamps: false
});
exports.default = Pago;
//# sourceMappingURL=pago.js.map
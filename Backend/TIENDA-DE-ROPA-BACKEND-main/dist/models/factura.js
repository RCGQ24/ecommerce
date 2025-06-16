"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    numero_factura: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    fecha_factura: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    monto_total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    items_detalle: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: connection_1.db,
    modelName: 'Factura',
    tableName: 'facturas',
    timestamps: false
});
// Sincronizar el modelo con la base de datos
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Factura.sync({ alter: true });
        console.log('Tabla de facturas sincronizada correctamente');
    }
    catch (error) {
        console.error('Error al sincronizar la tabla de facturas:', error);
    }
}))();
exports.default = Factura;
//# sourceMappingURL=factura.js.map
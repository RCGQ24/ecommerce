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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const factura_1 = __importDefault(require("../models/factura"));
const connection_1 = require("../db/connection");
class FacturasController {
    getFacturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const facturas = yield factura_1.default.findAll();
            if (facturas) {
                const facturasConItems = facturas.map(factura => {
                    const dataValues = factura.get({ plain: true });
                    if (dataValues.items_detalle) {
                        try {
                            dataValues.items = JSON.parse(dataValues.items_detalle);
                        }
                        catch (e) {
                            console.error('Error al parsear items_detalle:', e);
                            dataValues.items = []; // En caso de error, enviar un array vacío
                        }
                    }
                    delete dataValues.items_detalle; // Eliminar el campo original JSON
                    return dataValues;
                });
                res.json(facturasConItems);
            }
            else {
                res.status(404).json({ msg: 'Base de datos vacía' });
            }
        });
    }
    getFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const factura = yield factura_1.default.findByPk(id);
            if (factura) {
                const dataValues = factura.get({ plain: true });
                if (dataValues.items_detalle) {
                    try {
                        dataValues.items = JSON.parse(dataValues.items_detalle);
                    }
                    catch (e) {
                        console.error('Error al parsear items_detalle:', e);
                        dataValues.items = []; // En caso de error, enviar un array vacío
                    }
                }
                delete dataValues.items_detalle; // Eliminar el campo original JSON
                res.json(dataValues);
            }
            else {
                res.status(404).json({ msg: `No existe una factura con el id ${id}` });
            }
        });
    }
    postFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_pago, numero_factura, fecha_factura, monto_total, email, items } = req.body;
            try {
                // Verificar la conexión a la base de datos
                yield connection_1.db.authenticate();
                console.log('Conexión a la base de datos establecida correctamente');
                // Verificar si la tabla existe
                const tableExists = yield connection_1.db.getQueryInterface().showAllTables();
                console.log('Tablas existentes:', tableExists);
                console.log('Datos recibidos:', { id_pago, numero_factura, fecha_factura, monto_total, email, items });
                // Convertir el array de items a una cadena JSON para guardar en la base de datos
                const items_detalle = JSON.stringify(items);
                const factura = yield factura_1.default.create({
                    id_pago,
                    numero_factura,
                    fecha_factura,
                    monto_total,
                    email,
                    items_detalle // Guardar los ítems serializados
                });
                // ACTUALIZAR EL PAGO CON EL NÚMERO DE FACTURA
                if (id_pago && numero_factura) {
                    const [updatedRows] = yield connection_1.db.models.Pago.update({ numero_factura }, { where: { id: id_pago } });
                    console.log(`Pago actualizado con numero_factura: ${numero_factura}, filas afectadas: ${updatedRows}`);
                }
                // RESTAR STOCK DE LOS PRODUCTOS COMPRADOS
                if (Array.isArray(items)) {
                    for (const item of items) {
                        try {
                            const producto = yield connection_1.db.models.Producto.findByPk(item.id);
                            if (producto) {
                                const stockActual = Number(producto.get('stock')) || 0;
                                const cantidadComprada = Number(item.cantidad) || 1;
                                const nuevoStock = Math.max(0, stockActual - cantidadComprada);
                                yield producto.update({ stock: nuevoStock });
                                console.log(`Stock actualizado para producto ${item.id}: ${stockActual} -> ${nuevoStock}`);
                            }
                        }
                        catch (err) {
                            console.error(`Error al actualizar stock para producto ${item.id}:`, err);
                        }
                    }
                }
                res.json(factura);
            }
            catch (error) {
                console.error('Error detallado al crear factura:', error);
                if (error instanceof Error) {
                    console.error('Mensaje de error:', error.message);
                    console.error('Stack trace:', error.stack);
                }
                res.status(500).json({
                    msg: 'Error al crear la factura',
                    error: error instanceof Error ? error.message : 'Error desconocido',
                    details: error
                });
            }
        });
    }
    putFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const factura = yield factura_1.default.findByPk(id);
                if (!factura) {
                    return res.status(404).json({ msg: `No existe una factura con el id ${id}` });
                }
                yield factura.update(body);
                res.json(factura);
            }
            catch (error) {
                res.status(500).json({ msg: 'Hable con el administrador' });
            }
        });
    }
    deleteFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const factura = yield factura_1.default.findByPk(id);
            if (!factura) {
                return res.status(404).json({ msg: `No existe una factura con el id ${id}` });
            }
            yield factura.destroy();
            res.json({ msg: 'Factura eliminada' });
        });
    }
}
exports.default = new FacturasController();
//# sourceMappingURL=facturas.js.map
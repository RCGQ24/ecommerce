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
const pago_1 = __importDefault(require("../models/pago"));
const producto_1 = __importDefault(require("../models/producto"));
class EstadisticasController {
    getSupervisorStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Total de ventas y transacciones
                const facturas = yield factura_1.default.findAll();
                const totalVentas = facturas.reduce((sum, f) => sum + parseFloat(f.monto_total), 0);
                const totalTransacciones = facturas.length;
                const promedioPorVenta = totalTransacciones > 0 ? totalVentas / totalTransacciones : 0;
                // Métodos de pago y frecuencia
                const pagos = yield pago_1.default.findAll();
                const metodosPago = {};
                pagos.forEach((p) => {
                    const metodo = p.id_metodo_pago || 'Desconocido';
                    metodosPago[metodo] = (metodosPago[metodo] || 0) + 1;
                });
                // Productos más vendidos (usando los productos comprados en cada pago)
                const productosVendidos = {};
                for (const pago of pagos) {
                    let productosPago = [];
                    try {
                        productosPago = JSON.parse(pago.productos);
                    }
                    catch (e) {
                        continue; // Si no se puede parsear, saltar
                    }
                    for (const prod of productosPago) {
                        const idProd = prod.id;
                        const cantidad = prod.cantidad;
                        if (!productosVendidos[idProd]) {
                            const prodInfo = yield producto_1.default.findByPk(idProd);
                            productosVendidos[idProd] = {
                                nombre: prodInfo ? prodInfo.nombre_producto : 'Desconocido',
                                cantidad: 0
                            };
                        }
                        productosVendidos[idProd].cantidad += cantidad;
                    }
                }
                // Ordenar por cantidad descendente
                const tendenciaMensual = Object.values(productosVendidos).sort((a, b) => b.cantidad - a.cantidad).slice(0, 5);
                res.json({
                    totalVentas,
                    totalTransacciones,
                    promedioPorVenta,
                    metodosPago,
                    tendenciaMensual
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ msg: 'Error al obtener estadísticas', error });
            }
        });
    }
}
exports.default = new EstadisticasController();
//# sourceMappingURL=estadisticas.js.map
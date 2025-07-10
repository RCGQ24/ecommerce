import { Request, Response } from 'express';
import Factura from '../models/factura';
import Pago from '../models/pago';
import DetalleCarrito from '../models/detalle_carrito';
import Producto from '../models/producto';

class EstadisticasController {
  async getSupervisorStats(req: Request, res: Response) {
    try {
      // Total de ventas y transacciones
      const facturas = await Factura.findAll();
      const totalVentas = facturas.reduce((sum, f: any) => sum + parseFloat(f.monto_total), 0);
      const totalTransacciones = facturas.length;
      const promedioPorVenta = totalTransacciones > 0 ? totalVentas / totalTransacciones : 0;

      // Métodos de pago y frecuencia
      const pagos = await Pago.findAll();
      const metodosPago: Record<string, number> = {};
      pagos.forEach((p: any) => {
        const metodo = p.id_metodo_pago || 'Desconocido';
        metodosPago[metodo] = (metodosPago[metodo] || 0) + 1;
      });

      // Productos más vendidos (sin filtrar por mes)
      const detalles = await DetalleCarrito.findAll();
      const productosVendidos: Record<string, { nombre: string, cantidad: number }> = {};
      for (const detalle of detalles) {
        const idProd = (detalle as any).id_producto;
        const cantidad = (detalle as any).cantidad;
        if (!productosVendidos[idProd]) {
          const prod = await Producto.findByPk(idProd);
          productosVendidos[idProd] = {
            nombre: prod ? (prod as any).nombre_producto : 'Desconocido',
            cantidad: 0
          };
        }
        productosVendidos[idProd].cantidad += cantidad;
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al obtener estadísticas', error });
    }
  }
}

export default new EstadisticasController(); 
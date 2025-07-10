import { Request, Response } from 'express';
import Pago from '../models/pago';
import Producto from '../models/producto';

class PagosController {
  async getPagos(req: Request, res: Response) {
    const { email_usuario } = req.query;
    let pagos;
    if (email_usuario) {
      pagos = await Pago.findAll({ where: { email_usuario } });
    } else {
      pagos = await Pago.findAll();
    }
    if (pagos) {
      pagos = pagos.map(p => {
        const plain: any = p.toJSON();
        plain.productos = plain.productos ? JSON.parse(plain.productos) : [];
        return plain;
      });
      res.json(pagos);
    } else {
      res.status(404).json({ msg: 'Base de datos vacía' });
    }
  }

  async getPago(req: Request, res: Response) {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (pago) {
      const plain: any = pago.toJSON();
      plain.productos = plain.productos ? JSON.parse(plain.productos) : [];
      res.json(plain);
    } else {
      res.status(404).json({ msg: `No existe un pago con el id ${id}` });
    }
  }

  async postPago(req: Request, res: Response) {
    const { body } = req;
    try {
      const productos = body.productos ? JSON.stringify(body.productos) : '[]';
      let fecha_pago = body.fecha_pago;
      if (!fecha_pago) {
        fecha_pago = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Caracas' }));
      }
      const pago = await Pago.create({ ...body, productos, fecha_pago });

      // Descontar stock de productos comprados
      const productosComprados = body.productos || [];
      for (const prod of productosComprados) {
        const producto = await Producto.findByPk(prod.id);
        if (producto) {
          const nuevoStock = (producto as any).stock - prod.cantidad;
          await producto.update({ stock: nuevoStock });
        }
      }

      res.json(pago);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putPago(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const pago = await Pago.findByPk(id);
      if (!pago) {
        return res.status(404).json({ msg: `No existe un pago con el id ${id}` });
      }
      await pago.update(body);
      res.json(pago);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async deletePago(req: Request, res: Response) {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (!pago) {
      return res.status(404).json({ msg: `No existe un pago con el id ${id}` });
    }
    await pago.destroy();
    res.json({ msg: 'Pago eliminado' });
  }
}

export default new PagosController();
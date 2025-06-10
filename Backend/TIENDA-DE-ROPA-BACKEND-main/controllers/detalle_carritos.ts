import { Request, Response } from 'express';
import DetalleCarrito from '../models/detalle_carrito';

class DetalleCarritosController {
  async getDetalleCarritos(req: Request, res: Response) {
    const detalles = await DetalleCarrito.findAll();
    if (detalles) {
      res.json(detalles);
    } else {
      res.status(404).json({ msg: 'Base de datos vacía' });
    }
  }

  async getDetalleCarrito(req: Request, res: Response) {
    const { id } = req.params;
    const detalle = await DetalleCarrito.findByPk(id);
    if (detalle) {
      res.json(detalle);
    } else {
      res.status(404).json({ msg: `No existe un detalle de carrito con el id ${id}` });
    }
  }

  async postDetalleCarrito(req: Request, res: Response) {
    const { body } = req;
    try {
      const detalle = await DetalleCarrito.create(body);
      res.json(detalle);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putDetalleCarrito(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const detalle = await DetalleCarrito.findByPk(id);
      if (!detalle) {
        return res.status(404).json({ msg: `No existe un detalle de carrito con el id ${id}` });
      }
      await detalle.update(body);
      res.json(detalle);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async deleteDetalleCarrito(req: Request, res: Response) {
    const { id } = req.params;
    const detalle = await DetalleCarrito.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ msg: `No existe un detalle de carrito con el id ${id}` });
    }
    await detalle.destroy();
    res.json({ msg: 'Detalle de carrito eliminado' });
  }
}

export default new DetalleCarritosController();
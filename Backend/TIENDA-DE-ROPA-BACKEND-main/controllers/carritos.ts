import { Request, Response } from 'express';
import Carrito from '../models/carrito';

class CarritosController {
  async getCarritos(req: Request, res: Response) {
    const carritos = await Carrito.findAll();
    if (carritos) {
      res.json(carritos);
    } else {
      res.status(404).json({ msg: 'Base de datos vacía' });
    }
  }

  async getCarrito(req: Request, res: Response) {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);
    if (carrito) {
      res.json(carrito);
    } else {
      res.status(404).json({ msg: `No existe un carrito con el id ${id}` });
    }
  }

  async postCarrito(req: Request, res: Response) {
    const { body } = req;
    try {
      const carrito = await Carrito.create(body);
      res.json(carrito);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putCarrito(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const carrito = await Carrito.findByPk(id);
      if (!carrito) {
        return res.status(404).json({ msg: `No existe un carrito con el id ${id}` });
      }
      await carrito.update(body);
      res.json(carrito);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async deleteCarrito(req: Request, res: Response) {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      return res.status(404).json({ msg: `No existe un carrito con el id ${id}` });
    }
    await carrito.destroy();
    res.json({ msg: 'Carrito eliminado' });
  }
}

export default new CarritosController();
import { Request, Response } from 'express';
import Factura from '../models/factura';

class FacturasController {
  async getFacturas(req: Request, res: Response) {
    const facturas = await Factura.findAll();
    if (facturas) {
      res.json(facturas);
    } else {
      res.status(404).json({ msg: 'Base de datos vacía' });
    }
  }

  async getFactura(req: Request, res: Response) {
    const { id } = req.params;
    const factura = await Factura.findByPk(id);
    if (factura) {
      res.json(factura);
    } else {
      res.status(404).json({ msg: `No existe una factura con el id ${id}` });
    }
  }

  async postFactura(req: Request, res: Response) {
    const { body } = req;
    try {
      const factura = await Factura.create(body);
      res.json(factura);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putFactura(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const factura = await Factura.findByPk(id);
      if (!factura) {
        return res.status(404).json({ msg: `No existe una factura con el id ${id}` });
      }
      await factura.update(body);
      res.json(factura);
    } catch (error) {
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async deleteFactura(req: Request, res: Response) {
    const { id } = req.params;
    const factura = await Factura.findByPk(id);
    if (!factura) {
      return res.status(404).json({ msg: `No existe una factura con el id ${id}` });
    }
    await factura.destroy();
    res.json({ msg: 'Factura eliminada' });
  }
}

export default new FacturasController();
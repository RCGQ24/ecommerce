import { Request, Response } from 'express';
import Pago from '../models/pago';

class PagosController {
  async getPagos(req: Request, res: Response) {
    const pagos = await Pago.findAll();
    if (pagos) {
      res.json(pagos);
    } else {
      res.status(404).json({ msg: 'Base de datos vacía' });
    }
  }

  async getPago(req: Request, res: Response) {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (pago) {
      res.json(pago);
    } else {
      res.status(404).json({ msg: `No existe un pago con el id ${id}` });
    }
  }

  async postPago(req: Request, res: Response) {
    const { body } = req;
    try {
      const pago = await Pago.create(body);
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
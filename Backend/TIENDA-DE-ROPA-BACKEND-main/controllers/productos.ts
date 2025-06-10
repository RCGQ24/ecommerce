import { Request, Response } from 'express';
import Producto from '../models/producto';

class ProductosController {
  async getProductos(req: Request, res: Response) {
    const productos = await Producto.findAll();
    if (productos) {
      res.json(productos);
    } else {
      res.status(404).json({ msg: 'Base de datos vacía' });
    }
  }

  async getProducto(req: Request, res: Response) {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ msg: `No existe un producto con el id ${id}` });
    }
  }

  async postProducto(req: Request, res: Response) {
    const { body } = req;
    try {
      const producto = await Producto.create(body);
      res.json(producto);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putProducto(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).json({ msg: 'No existe un producto con el id ' + id });
      }
      await producto.update(body);
      res.json(producto);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async deleteProducto(req: Request, res: Response) {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ msg: 'No existe un producto con el id ' + id });
    }
    await producto.destroy();
    res.json({ msg: 'Producto eliminado correctamente' });
  }
}

export default new ProductosController();
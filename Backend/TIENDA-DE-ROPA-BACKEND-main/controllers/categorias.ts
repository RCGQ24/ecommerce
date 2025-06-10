import { Request, Response } from 'express';
import Categoria from '../models/categoria';

class CategoriasController {
  async getCategorias(req: Request, res: Response) {
    const categorias = await Categoria.findAll();
    if (categorias) {
      res.json(categorias);
    } else {
      res.status(404).json({ msg: 'Base de datos vacía' });
    }
  }

  async getCategoria(req: Request, res: Response) {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ msg: `No existe una categoría con el id ${id}` });
    }
  }

  async postCategoria(req: Request, res: Response) {
    const { body } = req;
    try {
      const categoria = await Categoria.create(body);
      res.json(categoria);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putCategoria(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ msg: 'No existe una categoría con el id ' + id });
      }
      await categoria.update(body);
      res.json(categoria);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async deleteCategoria(req: Request, res: Response) {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ msg: 'No existe una categoría con el id ' + id });
    }
    await categoria.destroy();
    res.json({ msg: 'Categoría eliminada correctamente' });
  }
}

export default new CategoriasController();
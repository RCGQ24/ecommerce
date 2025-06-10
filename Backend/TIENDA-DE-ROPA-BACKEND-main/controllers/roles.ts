import { Request, Response } from 'express';
import Rol from '../models/rol';

class RolesController {
  async getRoles(req: Request, res: Response) {
    const roles = await Rol.findAll();
    console.log("\nbuscando roles\n total", roles.length);

    if (roles) {
      res.json(roles);
    } else {
      console.log("\nBase de datos vacia\n");
      res.status(404).json({ msg: `Base de datos vacia` });
    }
  }

  async getRol(req: Request, res: Response) {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);

    if (rol) {
      res.json(rol);
    } else {
      res.status(404).json({ msg: `No existe un rol con el  id ${id}` });
    }
  }

  async postRol(req: Request, res: Response) {
    const { body } = req;
    console.log("se procede a crear Rol ", body);

    try {
      // Si tienes validación de email, mantenla, si no, puedes quitarla
      const existeEmail = await Rol.findOne({
        where: { email: body.email }
      });

      if (existeEmail) {
        return res.status(400).json({
          msg: 'Ya existe un rol con el email ' + body.email
        });
      }

      const rol = await Rol.create(body);

      setTimeout(() => {
        console.log("estoy en set time out");
        res.json(rol);
      }, 2000);

    } catch (error) {
      console.log("api postRol fallo", error);
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putRol(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const rol = await Rol.findByPk(id);
      if (!rol) {
        return res.status(404).json({
          msg: 'No existe un rol con el id ' + id
        });
      }

      await rol.update(body);
      res.json(rol);

    } catch (error) {
      console.log("error api put rol", error);
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async deleteRol(req: Request, res: Response) {
    res.json("No disponible esta API");
  }
}

export default new RolesController();


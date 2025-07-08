import { Request, Response } from 'express';
import Usuario from '../models/usuario';

class UsuariosController {
  async getUsuarios(req: Request, res: Response) {
    const usuarios = await Usuario.findAll();
    console.log("\nbuscando usuarios\n", usuarios);

    if (usuarios) {
      res.json(usuarios);
    } else {
      console.log("\nBase de datos vacia\n");
      res.status(404).json({ msg: `Base de datos vacia` });
    }
  }

  async getUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ msg: `No existe un usuario con el  id ${id}` });
    }
  }

  async postUsuario(req: Request, res: Response) {
    const { body } = req;
    console.log("se procede a crear usuario ", body);

    try {
      const existeEmail = await Usuario.findOne({
        where: { email: body.email }
      });

      if (existeEmail) {
        return res.status(400).json({
          msg: 'Ya existe un usuario con el email ' + body.email
        });
      }

      const usuario = await Usuario.create(body);

      setTimeout(() => {
        console.log("estoy en set time out");
        res.json(usuario);
      }, 2000);

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async putUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({
          msg: 'No existe un usuario con el id ' + id
        });
      }

      await usuario.update(body);
      res.json(usuario);

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Hable con el administrador' });
    }
  }

  async deleteUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: 'No existe un usuario con el id ' + id
      });
    }

    await usuario.update({ estado: false });
    res.json(usuario);
  }

  async loginUsuario(req: Request, res: Response) {
    const { email, contrasena } = req.body;
    if (!email || !contrasena) {
      return res.status(400).json({ msg: 'Email y contraseña son requeridos' });
    }
    try {
      const usuario = await Usuario.findOne({ where: { email, contrasena } });
      if (!usuario) {
        return res.status(401).json({ msg: 'Credenciales incorrectas' });
      }
      res.json(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }
  }
}

export default new UsuariosController();
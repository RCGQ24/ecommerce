import { Router } from 'express';
import usuariosController from '../controllers/usuarios';

const router = Router();

router.get('/',       usuariosController.getUsuarios.bind(usuariosController));
router.get('/:id',    usuariosController.getUsuario.bind(usuariosController));
router.post('/',      usuariosController.postUsuario.bind(usuariosController));
router.put('/:id',    usuariosController.putUsuario.bind(usuariosController));
router.delete('/:id', usuariosController.deleteUsuario.bind(usuariosController));

export default router;
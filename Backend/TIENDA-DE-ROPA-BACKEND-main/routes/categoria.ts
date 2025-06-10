import { Router } from 'express';
import categoriasController from '../controllers/categorias';

const router = Router();

router.get('/', categoriasController.getCategorias.bind(categoriasController));
router.get('/:id', categoriasController.getCategoria.bind(categoriasController));
router.post('/', categoriasController.postCategoria.bind(categoriasController));
router.put('/:id', categoriasController.putCategoria.bind(categoriasController));
router.delete('/:id', categoriasController.deleteCategoria.bind(categoriasController));

export default router;
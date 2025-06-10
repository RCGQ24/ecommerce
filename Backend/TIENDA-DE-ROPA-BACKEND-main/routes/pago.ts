import { Router } from 'express';
import pagosController from '../controllers/pagos';

const router = Router();

router.get('/',       pagosController.getPagos.bind(pagosController));
router.get('/:id',    pagosController.getPago.bind(pagosController));
router.post('/',      pagosController.postPago.bind(pagosController));
router.put('/:id',    pagosController.putPago.bind(pagosController));
router.delete('/:id', pagosController.deletePago.bind(pagosController));

export default router;
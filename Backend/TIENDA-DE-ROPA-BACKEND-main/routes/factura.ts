import { Router } from 'express';
import facturasController from '../controllers/facturas';

const router = Router();

router.get('/',       facturasController.getFacturas.bind(facturasController));
router.get('/:id',    facturasController.getFactura.bind(facturasController));
router.post('/',      facturasController.postFactura.bind(facturasController));
router.put('/:id',    facturasController.putFactura.bind(facturasController));
router.delete('/:id', facturasController.deleteFactura.bind(facturasController));

export default router;
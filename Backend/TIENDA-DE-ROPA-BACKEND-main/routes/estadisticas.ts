import { Router } from 'express';
import EstadisticasController from '../controllers/estadisticas';

const router = Router();

// Endpoint para estadísticas del panel del supervisor
router.get('/supervisor', EstadisticasController.getSupervisorStats);

export default router; 
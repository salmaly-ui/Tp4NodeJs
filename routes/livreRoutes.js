import { Router } from 'express';
import { livreController } from '../controllers/livreController.js';

const router = Router();

router.get('/', livreController.liste);

router.get('/ajouter', livreController.ajouterForm);
router.post('/ajouter', livreController.ajouter);

router.get('/:id/modifier', livreController.modifierForm);
router.post('/:id/modifier', livreController.modifier);

router.post('/:id/supprimer', livreController.supprimer);

router.get('/:id', livreController.details);
export default router;
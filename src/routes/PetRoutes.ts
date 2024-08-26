import express from 'express';
import PetController from '../controllers/PetController';

const router = express.Router();
const petController = new PetController();

router
  .post('/pets', petController.criaPet)
  .get('/pets', petController.listaPet)
  .get('/pets/:id', petController.listaPet)
  .put('/pets/:id', petController.atualizaPet)
  .delete('/pets/:id', petController.deletaPet);

export default router;
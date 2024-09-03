import express from 'express';
import PetController from '../controllers/PetController';
import PetRepository from '../repositories/PetRepository';
import { AppDataSource } from '../config/dataSource';

const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity"),
);

const petController = new PetController(petRepository);

router
  .post('/pets', (req, res) => petController.criaPet(req, res))
  .get('/pets', (req, res) => petController.listaPet(req, res))
  .get('/pets/filtroPorte', (req, res) => petController.buscaPetPeloPorte(req, res))
  .put('/pets/:pet_id/:adotante_id', (req, res) => petController.adotaPet(req, res))
  .put('/pets/:id', (req, res) => petController.atualizaPet(req, res))
  .delete('/pets/:id', (req, res) => petController.deletaPet(req, res));

export default router;
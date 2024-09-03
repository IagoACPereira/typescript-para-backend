import { Router } from 'express';
import AdotanteController from '../controllers/AdotanteController';
import { AppDataSource } from '../config/dataSource';
import AdotanteRepository from '../repositories/AdotanteRepository';

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"))
const adotanteController = new AdotanteController(adotanteRepository);

const router = Router()
  .post('/adotantes', (req, res) => adotanteController.criaAdotante(req, res))
  .get('/adotantes', (req, res) => adotanteController.listaAdotante(req, res))
  .put('/adotantes/:id', (req, res) => adotanteController.atualizaAdotante(req, res))
  .delete('/adotantes/:id', (req, res) => adotanteController.deletaAdotante(req, res));

export default router;

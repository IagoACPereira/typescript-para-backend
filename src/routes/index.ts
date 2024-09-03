import express from 'express';
import petRouter from './PetRoutes'
import adotanteRouter from './AdotanteRouter'

function router(app: express.Router) {
  app.use(
    petRouter,
    adotanteRouter,
  )
}

export default router;
import express from 'express';
import petRouter from './PetRoutes'

function router(app: express.Router) {
  app.use(
    petRouter,
  )
}

export default router;
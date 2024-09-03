import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepsitory from "../repositories/AdotanteRepository";

export default class AdotanteController {
  constructor(private repository: AdotanteRepsitory) {}
  async criaAdotante(req: Request, res: Response) {
    const {
      nome,
      senha,
      celular,
      foto,
      endereco,
    } = <AdotanteEntity>req.body;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco,
    )

    await this.repository.criaAdotante(novoAdotante);

    return res.status(201).json(novoAdotante);
  }
}
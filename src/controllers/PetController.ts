import { Request, Response } from "express";
import type TipoPet from "../types/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntities";
import EnumPorte from "../enum/EnumPorte";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId(): number {
  id = id + 1;
  return id;
}

export default class PetController{
  constructor(private repository: PetRepository) {}
  criaPet(req: Request, res: Response) {
    const {
      adotado,
      especie,
      porte,
      nome,
      dataDeNascimento,
    } = <PetEntity>req.body;
    
    if(!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({
        erro: 'Especie inválida',
      });
    }

    if(porte && !(porte in EnumPorte)) {
      return res.status(400).json({
        erro: 'Especie inválido',
      });
    }

    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte,
    );

    this.repository.criaPet(novoPet);

    res.status(201).json(novoPet);
  }

  async listaPet(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity,
    );

    if(!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find(pet => pet.id === Number(id));
    
    if (!pet) {
      return res.status(404).json({ erro: 'Pet não encontrado' })
    }

    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);
    return res.status(200).json({
      mensagem: 'Pet deletado com sucesso',
    });
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id),
    );

    if (!success) {
      return res.status(404).json({ message });
    }

    return res.sendStatus(204);
  }
}
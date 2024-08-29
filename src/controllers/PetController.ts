import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";

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
      nome,
      dataDeNascimento,
    } = <TipoPet>req.body;
    
    if(!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({
        erro: 'Especie inválida',
      });
    }

    const novoPet: TipoPet = {
      id: geraId(),
      adotado,
      especie,
      nome,
      dataDeNascimento,
    }; 

    // listaDePets.push(novoPet);
    this.repository.criaPet(novoPet);

    res.status(201).json(novoPet);
  }

  listaPet(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const {
      adotado,
      especie,
      nome,
      dataDeNascimento
    } = req.body as TipoPet;
    const pet = listaDePets.find(pet => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: 'Pet não encontrado' })
    }

    pet.nome = nome;
    pet.especie = especie;
    pet.adotado = adotado;
    pet.dataDeNascimento = dataDeNascimento;

    return res.status(200).json(pet);
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
}
import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntities";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository {
  private petRepository: Repository<PetEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>,
  ) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }
  
  criaPet(pet: PetEntity): void {
    this.petRepository.save(pet);
  }
  async listaPet(): Promise<Array<PetEntity>> {
    return await this.petRepository.find();
  }
  async atualizaPet(
    id: number,
    newData: PetEntity,
  ): Promise<{ success: boolean, message?: string }> {
    try {
      const petToUpdate = await this.petRepository.findOne({ where: { id } });

      if(!petToUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }

      Object.assign(petToUpdate, newData);

      await this.petRepository.save(petToUpdate);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pet."
      };
    }
  }
  deletaPet(id: number): void {
    throw new Error("Method not implemented.");
  }

  async adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string; }> {
    const pet = await this.petRepository.findOne({ where: { id: idPet } });
    if (!pet) {
      return { success: false, message: 'Pet não encontrado' };
    }

    const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante } });
    if (!adotante) {
      return { success: false, message: 'Adotante não encontrado' };
    }

    pet.adotante = adotante;
    pet.adotado = true;

    await this.petRepository.save(pet);

    return { success: true };
  }

  async buscaPetPeloPorte(porte: EnumPorte): Promise<Array<PetEntity>> {
    const pets = await this.petRepository.find({ where: { porte } });

    return pets;
  }
}
import PetEntity from "../../entities/PetEntities";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): Array<PetEntity> | Promise<Array<PetEntity>>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletaPet(id: number): void;

  adotaPet(
    idPet: number, 
    idAdotante: number
  ): Promise<{ success: boolean, message?: string }> | void;

  buscaPetPeloPorte(porte: EnumPorte): Promise<Array<PetEntity>> | Array<PetEntity>;
}
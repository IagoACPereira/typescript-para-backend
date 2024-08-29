import PetEntity from "../../entities/PetEntities";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): Array<PetEntity>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletaPet(id: number): void;
}
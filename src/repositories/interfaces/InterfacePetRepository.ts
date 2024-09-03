import PetEntity from "../../entities/PetEntities";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): Array<PetEntity> | Promise<Array<PetEntity>>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletaPet(id: number): void;

  adotaPet(
    idPet: number, 
    idAdotante: number
  ): Promise<{ success: boolean, message?: string }> | void;

  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity> (
    campo: Tipo,
    valor: PetEntity[Tipo],
  ): Promise<Array<PetEntity>> | Array<PetEntity>;
}
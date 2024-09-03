import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
  listaAdotante(): Array<AdotanteEntity> | Promise<Array<AdotanteEntity>>;
  atualizaAdotante(
    id: number, 
    adotante: AdotanteEntity
  ): void ;
  deletaAdotante(id: number): void;
}
import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;

  listaAdotante(): Array<AdotanteEntity> | Promise<Array<AdotanteEntity>>;

  atualizaAdotante(
    id: number, 
    adotante: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> | void;

  deletaAdotante(id: number): Promise<{ success: boolean; message?: string }> | void;

  atualizaEnderecoAdotante(
    idAdotante: number, 
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> | void;
}
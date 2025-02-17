import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  constructor(private repository: Repository<AdotanteEntity>) {}
  
  criaAdotante(adotante: AdotanteEntity): void | Promise<void> {
    this.repository.save(adotante);
  }

  listaAdotante(): Array<AdotanteEntity> | Promise<Array<AdotanteEntity>> {
    return this.repository.find();
  }

  async atualizaAdotante(id: number, adotante: AdotanteEntity): Promise<{ success: boolean, message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if(!adotanteToUpdate) {
        return { success: false, message: 'Adotante não encontrado' };
      }

      Object.assign(adotanteToUpdate, adotante);

      await this.repository.save(adotanteToUpdate);

      return { success: true };
    } catch (error) {
      return { success: false, message: 'Ocorreu um erro ao tentar atualizar adotante' }
    }
  }

  async deletaAdotante(id: number): Promise<{ success: boolean; message?: string; }> {
    try {
      const adotanteToRemove = await this.repository.findOne({ where: { id } });

      if(!adotanteToRemove) {
        return { success: false, message: 'Adotante não encontrado' };
      }

      await this.repository.remove(adotanteToRemove);

      return { success: true };
    } catch (error) {
      return { success: false, message: 'Ocorreu um erro ao tentar remover adotante' }
    }
  }

  async atualizaEnderecoAdotante(
    idAdotante: number, 
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string; }>{
    const adotante = await this.repository.findOne({ where: { id: idAdotante } });

    if(!adotante) {
      return { success: false, message: 'Adotante não encontrado' }
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);

    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);

    return { success: true };
  }
}
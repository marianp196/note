import { Service } from './service';
import { Domain } from './domain';
import { DataStoreService } from '../storage/data-store.service';

export class DomainService<T extends Domain> implements Service<T>{
  constructor(private domFactory: () => T, private repository: DataStoreService) { }

  createObj(): T {
    return this.domFactory();
  }

  public async create(domain: T): Promise<any> {
    await this.repository.create(domain.id, domain.getMemento());
  }

  public async update(domain: T): Promise<any> {
    await this.repository.update(domain.id, domain.getMemento());
  }

  public async delete(domain: T): Promise<boolean> {
    await this.repository.remove(domain.id);
    return true;
  }
  
  public async getAll(): Promise<T[]> {
    const mementos = await this.repository.getAll();
    return mementos.map(m => {
      const domain = this.domFactory();
      domain.setMemento(m);
      return domain;
    })
  }

  public async get(id: string): Promise<T> {
    const memento = await this.repository.getById(id);
    const domain = this.domFactory();
    domain.setMemento(memento);
    return domain;
  }
}

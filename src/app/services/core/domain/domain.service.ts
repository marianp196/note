import { Service } from './service';
import { Domain } from './domain';
import { DataStoreService } from '../storage/data-store.service';
import { Inject, InjectionToken } from '@angular/core';
import { ChangeTrigger, ChangeType } from './changeTrigger';

export const CHANGE_TRIGGER = new InjectionToken<ChangeTrigger>('CHANGE_TRIGGER');


export class DomainService<T extends Domain> implements Service<T>{
  constructor(private domFactory: () => T, 
              private repository: DataStoreService,
              private domainName: string,
              @Inject('CHANGE_TRIGGER') private changeTrigger?: ChangeTrigger[]) { }

  createObj(): T {
    return this.domFactory();
  }

  public async create(domain: T): Promise<any> {
    await this.repository.create(domain.id, domain.getMemento());
    await this.triggerChange(ChangeType.Add, domain.id);
  }

  public async update(domain: T): Promise<any> {
    await this.repository.update(domain.id, domain.getMemento());
    await this.triggerChange(ChangeType.Update, domain.id);
  }

  public async delete(domain: T): Promise<boolean> {
    await this.repository.remove(domain.id);
    await this.triggerChange(ChangeType.Delete, domain.id);
    return true;
  }

  public async exists(id: string): Promise<boolean> {
    return this.repository.exists(id);
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

  private async triggerChange(changeType: ChangeType, id: string) {
    try {
      if (this.changeTrigger) {
        for (const trigger of this.changeTrigger) {
          await trigger.trackId(changeType, this.domainName, id); // ToDo vielleicht sollte ein Fehler jier nicht verschluckt werden
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

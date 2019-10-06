import { Injectable } from '@angular/core';
import { DomainService } from '../core/domain/domain.service';
import { Space } from './space';
import { DatabaseService } from '../core/storage/database.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceService extends DomainService<Space> {

  constructor(database: DatabaseService) { 
    super(() => new Space(), database.getStore('space'), 'Space')
  }

  public async createSet() {
    const data = [
      {id: 'ToDo', header: 'ToDos', iconKey: 'checkbox-outline', safe: false},
      {id: 'Gedanken', header: 'Gedanken', iconKey: 'list', safe: false},
      {id: 'Serien', header: 'Serien', iconKey: 'desktop', safe: false}
    ]
    if((await this.getAll()).length === 0) {
      for (const mem of data) {
        const space = new Space();
        space.setMemento(mem);
        await this.create(space);
      }
    }
  }
}

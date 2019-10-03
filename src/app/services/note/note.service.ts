import { Injectable } from '@angular/core';
import { DatabaseService } from '../storage/database.service';
import { Service } from '../service';
import { NoteData } from './note-data';
import * as moment from 'moment';
import {Guid} from 'guid-typescript';
import { DataStoreService } from '../storage/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements Service<NoteData> {
  constructor(database: DatabaseService) { 
    this.store = database.getStore('note');
  }

  private store: DataStoreService;

  createObj(): NoteData {
    const note = new NoteData();
    note.id = Guid.create().toString();
    note.timestamp = moment();
    note.categories = [];
    note.attechments = [];
    return note;
  }
  
  public async create(domain: NoteData): Promise<NoteData> {
    await this.store.create(domain.id, domain.getMemento());
    return domain;
  }

  public async update(domain: NoteData): Promise<NoteData> {
    await this.store.update(domain.id, domain.getMemento());
    return domain;
  }

  public async delete(domain: NoteData): Promise<boolean> {
    await this.store.remove(domain.id);
    return true;
  }
  
  public async getAll(): Promise<NoteData[]> {
    const mementos = await this.store.getAll();
    return mementos.map(m => {
      const domain = new NoteData();
      domain.setMemento(m);
      return domain;
    })
  }

  public async get(id: string): Promise<NoteData> {
    return await this.store.getById(id);
  }
}

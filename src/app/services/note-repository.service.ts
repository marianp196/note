import { NoteData } from './domain/note-data';
import { Domain } from './domain/domain';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EClientState } from './domain/client-state';
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class NoteRepositoryService {

  constructor(private storage: Storage) { }

  public async create(note: Domain<NoteData>): Promise<any> {
    if (!note) {
      throw "Note is undefined";
    }

    if (!note.id) {
      throw "Id is undefined";
    }

    if (await this.exists(note.id)) {
      throw "Id exists allready";
    }

    note.state = EClientState.Created;

    await this.storage.set(note.id, note);
  }

  public async update(note: Domain<NoteData>): Promise<any> {
    if (!note) {
      throw "Note is undefined";
    }

    if (!note.id) {
      throw "Id is undefined";
    }

    if (!await this.exists(note.id)) {
      throw "Id doesn't exist";
    }

    note.state = EClientState.Updated;

    await this.storage.set(note.id, note);
  }

  public async GetAll(): Promise<Domain<NoteData>[]> {
    const keys = await this.storage.keys();
    const resultList: Domain<NoteData>[] = [];
    for (const key of keys) {
      resultList.push(await this.storage.get(key));
    }
    return resultList;
  }


  public async exists(id: string): Promise<boolean> {
    const keys = await this.storage.keys();
    return keys.findIndex(x => x === id) !== -1;
  }

  public createNew(): Domain<NoteData> {
    const domain = new Domain<NoteData>();
    domain.id = Guid.create().toString();
    domain.data = new NoteData();
    domain.data.timestamp = new Date(Date.now());
    return domain;
  }
}

import { Injectable, Inject } from '@angular/core';
import { DatabaseService } from '../core/storage/database.service';
import { NoteData } from './note-data';
import * as moment from 'moment';
import {Guid} from 'guid-typescript';
import { DomainService, CHANGE_TRIGGER } from '../core/domain/domain.service';
import { ChangeTrigger } from '../core/domain/changeTrigger';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends DomainService<NoteData> {
  constructor(database: DatabaseService, @Inject(CHANGE_TRIGGER) trigger: ChangeTrigger) { 
    super(() => new NoteData(), database.getStore('note'), 'NoteData', trigger);
  }

  public async getAllBySpaceId(spaceId: string): Promise<NoteData[]> {
    const all = await this.getAll();
    return all.filter(note => note.spaceId === spaceId);
  }

  public createObj(): NoteData {
    const note = new NoteData();
    note.id = Guid.create().toString();
    note.timestamp = moment();
    note.categories = [];
    note.attechments = [];
    return note;
  }
}

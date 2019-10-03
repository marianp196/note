import { Injectable } from '@angular/core';
import { DatabaseService } from '../core/storage/database.service';
import { NoteData } from './note-data';
import * as moment from 'moment';
import {Guid} from 'guid-typescript';
import { DomainService } from '../core/domain/domain.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends DomainService<NoteData> {
  constructor(database: DatabaseService) { 
    const store = database.getStore('note');
    super(() => new NoteData(), store);
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

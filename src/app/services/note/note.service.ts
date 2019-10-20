import { Injectable, Inject } from '@angular/core';
import { DatabaseService } from '../core/storage/database.service';
import { NoteData } from './note-data';
import * as moment from 'moment';
import { Guid } from 'guid-typescript';
import { DomainService, CHANGE_TRIGGER } from '../core/domain/domain.service';
import { ChangeTrigger } from '../core/domain/changeTrigger';
import { TagSuggestionService } from '../tag-suggestion/tag-suggestion.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends DomainService<NoteData> {
  constructor(database: DatabaseService, @Inject(CHANGE_TRIGGER) trigger: ChangeTrigger[], private tags: TagSuggestionService) {
    super(() => new NoteData(), database.getStore('note'), 'NoteData', trigger);
  }

  public async create(domain: NoteData): Promise<NoteData> {
    domain.freeTags = this.cleanFreeTags(domain.freeTags);
    await this.persistFreeTags(domain.freeTags);
    return await super.create(domain);
  }

  public async update(domain: NoteData): Promise<any> {
    domain.freeTags = this.cleanFreeTags(domain.freeTags);
    await this.persistFreeTags(domain.freeTags);
    await super.update(domain);
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

  private cleanFreeTags(freeTags: string): string {
    if (!freeTags) {
      return freeTags;
    }

    const tags = freeTags.split(' ').filter(x => x !== '');
    const cleanedTags = [];

    for (let tag of tags) {
      if (!tag.startsWith('#')) {
        tag = '#' + tag;
      }
      cleanedTags.push(tag);
    }

    return cleanedTags.join(' ');
  }

  private async persistFreeTags(freeTags: string) {
    try {
      await this.tags.addTagsToStorage(freeTags);
    } catch (error) {
      console.log(error);
    }
  }
}

import { Injectable } from '@angular/core';
import { DatabaseService } from '../core/storage/database.service';
import { DataStoreService } from '../core/storage/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class TagSuggestionService {
  constructor(databaseService: DatabaseService) {
    this.dataStorage = databaseService.getStore('tags');
  }

  private dataStorage: DataStoreService;

  public async getTagSuggestions(searchStr: string): Promise<string[]> {
    return (await this.dataStorage.getAll()).filter(t => t.tag.startsWith(searchStr));
  }

  public async addTagsToStorage(freeTags: string) {
    if (!freeTags) {
      return;
    }

    const tags = freeTags.split(' ').filter(x => x !== '');

    for(const tag of tags) {
      if (!await this.dataStorage.exists(tag)) {
        await this.dataStorage.create(tag, {tag});
        console.log('huu')
      }
    }
  }
}

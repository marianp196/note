import { Injectable } from '@angular/core';
import { NoteService } from '../note/note.service';
import { SpaceService } from '../space/space.service';
import { NoteData } from '../note/note-data';
import { Space } from '../space/space';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  constructor(private noteService: NoteService, private spaceService: SpaceService) { }

  public async exportAsJson(): Promise<string> {
    const notes = (await this.noteService.getAll()).map(n => n.getMemento());
    const spaces = (await this.spaceService.getAll()).map(s => s.getMemento());

    const dataJSON = JSON.stringify({notes, spaces}); // ToDo  hierfür Typ einführen
    return dataJSON;
  }

  public async importAsJson(jsonString: string) {
    const data = JSON.parse(jsonString); // ToDo  hierfür Typ einführen

    if(!data || !data.notes || !data.spaces) {
      throw Error('input not valid');
    }

    console.log(data.notes);
    const notesDomain = data.notes/*.filter(x => x ? true : false).*/.map(n => {
      const newNote = new NoteData();
      newNote.setMemento(n);
      return newNote;
    });
    console.log(notesDomain);

    console.log(data.spaces);
    const spacesDomain = data.spaces/*.filter(x => x ? true : false).*/.map(s => {
      const newSpace = new Space();
      newSpace.setMemento(s);
      return newSpace;
    });
    console.log(spacesDomain);

    for (const note of notesDomain) {
      if (await this.noteService.exists(note.id)) {
        await this.noteService.update(note);
      } else {
        await this.noteService.create(note);
      }
    }

    for (const space of spacesDomain) {
      if (await this.spaceService.exists(space.id)) {
        await this.spaceService.update(space);
      } else {
        await this.spaceService.create(space);
      }
    }
  }
}

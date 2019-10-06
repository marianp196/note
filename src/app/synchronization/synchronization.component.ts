import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { NoteService } from '../services/note/note.service';
import { SpaceService } from '../services/space/space.service';
import { NoteData } from '../services/note/note-data';
import { Space } from '../services/space/space';

@Component({
  selector: 'app-synchronization',
  templateUrl: './synchronization.component.html',
  styleUrls: ['./synchronization.component.scss'],
})
export class SynchronizationComponent implements OnInit {

  constructor(private login: LoginService, private noteService: NoteService, private spaceService: SpaceService) { }

  public progress: ReplaySubject<number>;
  public uri = 'http://localhost:8080';
  public profile = 'origin';

  public password: string;
  public exportArea: string;

  public passwordImport: string;
  public importArea: string;

  ngOnInit() {}

  public async upload() {
    this.progress = new ReplaySubject<number>();
  }

  public async exportAsJson() {
    if (!this.login.getNewLoginToken(this.password)) {
      this.exportArea = 'password not valid';
      return;
    }

    const notes = (await this.noteService.getAll()).map(n => n.getMemento());
    const spaces = (await this.spaceService.getAll()).map(s => s.getMemento());

    const dataJSON = JSON.stringify({notes, spaces}); // ToDo  hierfür Typ einführen
    this.exportArea = dataJSON;
  }

  public async importAsJson() {
    if (!this.login.getNewLoginToken(this.passwordImport)) {
      this.importArea = 'password not valid';
      return;
    }

    const data = JSON.parse(this.importArea); // ToDo  hierfür Typ einführen

    if(!data || !data.notes || !data.spaces) {
      this.importArea = 'input not valid';
    }

    const notesDomain = data.notes.map(n => {
      const newNote = new NoteData();
      newNote.setMemento(n);
      return newNote;
    });

    const spacesDomain = data.spaces.map(s => {
      const newSpace = new Space();
      newSpace.setMemento(s);
      return newSpace;
    });

    for (const note of notesDomain) {
      if (await this.noteService.get(note.id)) {
        await this.noteService.update(note);
      } else {
        await this.noteService.create(note);
      }
    }

    for (const space of spacesDomain) {
      if (await this.noteService.get(space.id)) {
        await this.spaceService.update(space);
      } else {
        await this.spaceService.create(space);
      }
    }
  }
}

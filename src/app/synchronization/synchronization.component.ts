import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { NoteService } from '../services/note/note.service';
import { SpaceService } from '../services/space/space.service';

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

  ngOnInit() {}

  public async upload() {
    this.progress = new ReplaySubject<number>();
  }

  public async exportAsJson() {
    if (!this.login.getNewLoginToken(this.password)) {
      this.exportArea = 'password not valid';
      return;
    }

    const notes = await this.noteService.getAll();
    const spaces = await this.spaceService.getAll();
    const dataJSON = JSON.stringify({notes, spaces});
    this.exportArea = dataJSON;
  }
}

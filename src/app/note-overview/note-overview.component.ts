import { NoteData } from '../services/note/note-data';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteEditComponent } from '../note-edit/note-edit.component';
import * as _ from 'lodash';
import { NoteService } from '../services/note/note.service';

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.scss'],
})
export class NoteOverviewComponent implements OnInit {

  constructor(private noteRepo: NoteService, private modal: ModalController) { }

  public notes: NoteData[];
  public searchStr: string;

  async ngOnInit() {
    this.notes = await this.getAll();
  }

  public async update(note: NoteData) {
    const modal = await this.modal.create({component: NoteEditComponent, componentProps: {note}});
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.role === 'save') {
      await this.noteRepo.update(note);
    }
  }

  public async create() {
    const note = this.noteRepo.createObj();
    const modal = await this.modal.create({component: NoteEditComponent, componentProps: {note}});
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.role === 'save') {
      await this.noteRepo.create(note);
      this.notes.push(note);
    }
  }

  private async getAll(): Promise<NoteData[]> {
    const notes = await this.noteRepo.getAll();
    console.log(notes.map(x => x.timestamp));
    return _.orderBy(notes, [note => note.timestamp.unix()]);
  }
}

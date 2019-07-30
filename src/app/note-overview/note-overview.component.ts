import { NoteData } from './../services/domain/note-data';
import { Domain } from './../services/domain/domain';
import { NoteRepositoryService } from './../services/note-repository.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteEditComponent } from '../note-edit/note-edit.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.scss'],
})
export class NoteOverviewComponent implements OnInit {

  constructor(private noteRepo: NoteRepositoryService, private modal: ModalController) { }

  public notes: Domain<NoteData>[];
  public searchStr: string;

  async ngOnInit() {
    this.notes = await this.getAll();
  }

  public async update(note: Domain<NoteData>) {
    const modal = await this.modal.create({component: NoteEditComponent, componentProps: {note}});
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.role === 'save') {
      await this.noteRepo.update(note);
    }
  }

  public async create() {
    const note = this.noteRepo.createNew();
    const modal = await this.modal.create({component: NoteEditComponent, componentProps: {note}});
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.role === 'save') {
      await this.noteRepo.create(note);
      this.notes.push(note);
    }
  }

  private async getAll(): Promise<Domain<NoteData>[]> {
    const notes = await this.noteRepo.GetAll();
    return _.orderBy(notes, [note => note.timestamp]);
  }
}

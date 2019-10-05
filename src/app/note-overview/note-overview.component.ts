import { NoteData } from '../services/note/note-data';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteEditComponent } from '../note-edit/note-edit.component';
import * as _ from 'lodash';
import { NoteService } from '../services/note/note.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceService } from '../services/space/space.service';
import { Space } from '../services/space/space';

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.scss'],
})
export class NoteOverviewComponent implements OnInit {

  constructor(private noteRepo: NoteService, private spaceService: SpaceService,
    private modal: ModalController, private activatedRoute: ActivatedRoute) { 
  }

  private space: Promise<Space>;

  public notes: Promise<NoteData[]>;
  public searchStr: string;

  ngOnInit() {
    const spaceId = this.activatedRoute.snapshot.params.space;
    this.space = this.spaceService.get(spaceId);

    this.notes = this.getAll(spaceId);
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
    const newNote = this.noteRepo.createObj();
    newNote.spaceId = (await this.space).id;

    const modal = await this.modal.create({component: NoteEditComponent, componentProps: {note: newNote}});
    await modal.present();
    const result = await modal.onDidDismiss();

    const notes = await this.notes;
    
    if (result.role === 'save') {
      await this.noteRepo.create(newNote);
      notes.push(newNote);
    }
  }

  private async getAll(spaceID: string): Promise<NoteData[]> {
    const notes = await this.noteRepo.getAllBySpaceId(spaceID)
    console.log(notes.map(x => x.timestamp));
    return _.orderBy(notes, [note => note.timestamp.unix()]);
  }
}

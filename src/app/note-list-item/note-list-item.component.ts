import { NoteEditComponent } from './../note-edit/note-edit.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { NoteData } from '../services/note/note-data';
import { NoteService } from '../services/note/note.service';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss'],
})
export class NoteListItemComponent implements OnInit {

  constructor(private noteRepo: NoteService, private modal: ModalController) { }

  ngOnInit() {}

  @Input()
  public note: NoteData;

  public opened: boolean = false;
  
  public open() {
    this.opened = !this.opened;
  }

  public async update(note: NoteData) {
    const modal = await this.modal.create({component: NoteEditComponent, componentProps: {note}});
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.role === 'save') {
      await this.noteRepo.update(note);
    }
  }


}

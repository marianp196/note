import { NoteEditComponent } from './../note-edit/note-edit.component';
import { NoteRepositoryService } from './../services/note-repository.service';
import { ModalController } from '@ionic/angular';
import { Domain } from './../services/domain/domain';
import { Component, OnInit, Input } from '@angular/core';
import { NoteData } from '../services/domain/note-data';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss'],
})
export class NoteListItemComponent implements OnInit {

  constructor(private noteRepo: NoteRepositoryService, private modal: ModalController) { }

  ngOnInit() {}

  @Input()
  public note: Domain<NoteData>;

  public opened: boolean = false;
  
  public open() {
    this.opened = !this.opened;
  }

  public async update(note: Domain<NoteData>) {
    const modal = await this.modal.create({component: NoteEditComponent, componentProps: {note}});
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.role === 'save') {
      await this.noteRepo.update(note);
    }
  }


}

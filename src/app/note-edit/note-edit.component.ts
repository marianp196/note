import { ModalController } from '@ionic/angular';
import { NoteData } from '../services/note/note-data';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {

  constructor(private modal: ModalController) { }

  @Input() note: NoteData

  public close() {
    this.modal.dismiss();
  }

  public save() {
    this.modal.dismiss(this.note, 'save');
  }

  ngOnInit() {}

}

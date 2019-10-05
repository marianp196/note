import { ModalController } from '@ionic/angular';
import { NoteData } from '../services/note/note-data';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { __assign } from 'tslib';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {

  constructor(private modal: ModalController) { }

  @Input() note: NoteData;
  public noteGroup: FormGroup;

  public close() {
    this.modal.dismiss();
  }

  public save() {
    const data = this.noteGroup.getRawValue();
    _.assign(this.note, data);
    this.modal.dismiss(this.note, 'save');
  }

  ngOnInit() {
    this.noteGroup = new FormGroup({
      title: new FormControl(),
      freeTags: new FormControl(),
      text: new FormControl(),
    });
    
    this.noteGroup.get('title').setValue(this.note.title);
    this.noteGroup.get('freeTags').setValue(this.note.freeTags);
    this.noteGroup.get('text').setValue(this.note.text);
  }

}

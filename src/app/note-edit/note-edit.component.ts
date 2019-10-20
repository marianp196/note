import { ModalController } from '@ionic/angular';
import { NoteData } from '../services/note/note-data';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TagSuggestionService } from '../services/tag-suggestion/tag-suggestion.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {

  constructor(private modal: ModalController, private tags: TagSuggestionService) { }

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

    this.noteGroup.get('freeTags').valueChanges.subscribe(this.changeFreeTagsInput.bind(this));
  }

  public async changeFreeTagsInput(freeTags: string) {
    console.log(await this.tags.getTagSuggestions(freeTags));
  }

}

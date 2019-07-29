import { Domain } from './../services/domain/domain';
import { Component, OnInit, Input } from '@angular/core';
import { NoteData } from '../services/domain/note-data';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss'],
})
export class NoteListItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input()
  public note: Domain<NoteData>;

  public opened: boolean = false;
  
  public open() {
    this.opened = !this.opened;
  }

}

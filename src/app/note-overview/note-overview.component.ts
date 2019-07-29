import { NoteData } from './../services/domain/note-data';
import { Domain } from './../services/domain/domain';
import { NoteRepositoryService } from './../services/note-repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.scss'],
})
export class NoteOverviewComponent implements OnInit {

  constructor(private noteRepo: NoteRepositoryService) { }

  public notes: Promise<Domain<NoteData>[]>;

  ngOnInit() {
    this.notes = this.noteRepo.GetAll();
  }

  public async create() {
    await this.noteRepo.create(this.noteRepo.createNew());
  }

}

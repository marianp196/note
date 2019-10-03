import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-synchronization',
  templateUrl: './synchronization.component.html',
  styleUrls: ['./synchronization.component.scss'],
})
export class SynchronizationComponent implements OnInit {

  constructor() { }

  public progress: ReplaySubject<number>;
  public uri = 'http://localhost:8080';
  public profile = 'origin';
  ngOnInit() {}

  public async upload() {
    this.progress = new ReplaySubject<number>();
    //await this.syncService.uploadData(this.progress);
  }
}

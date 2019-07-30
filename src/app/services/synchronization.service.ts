import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root'
})
export class SynchronizationService {

  constructor() { }

  public async uploadData(progress: ReplaySubject<number>): Promise<any> {
    progress.next(0.2);
    await new Promise(r => setTimeout(r, 1000));
    progress.next(0.4);
    await new Promise(r => setTimeout(r, 5000));
    progress.next(0.5);
    await new Promise(r => setTimeout(r, 1000));
    progress.next(0.9);
    await new Promise(r => setTimeout(r, 800));
    progress.next(1);
  }
}

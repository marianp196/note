import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { ImportExportService } from '../services/synchronization/import-export.service';

@Component({
  selector: 'app-synchronization',
  templateUrl: './synchronization.component.html',
  styleUrls: ['./synchronization.component.scss'],
})
export class SynchronizationComponent implements OnInit {

  constructor(private login: LoginService,private  importExport: ImportExportService) { }

  public progress: ReplaySubject<number>;
  public uri = 'http://localhost:8080';
  public profile = 'origin';

  public password: string;
  public exportArea: string;

  public passwordImport: string;
  public importArea: string;

  ngOnInit() {}

  public async upload() {
    this.progress = new ReplaySubject<number>();
  }

  public async exportAsJson() {
    if (!this.login.getNewLoginToken(this.password)) {
      this.exportArea = 'password not valid';
      return;
    }

    try {
      this.exportArea = await this.importExport.exportAsJson()
    } catch(error) {
      if (error instanceof Error) {
        this.exportArea = error.message;
      } else {
        this.exportArea = JSON.stringify(error);
      }

      throw error;
    }
  }

  public async importAsJson() {
    if (!this.login.getNewLoginToken(this.passwordImport)) {
      this.importArea = 'password not valid';
      return;
    }

    try {
      await this.importExport.importAsJson(this.importArea)
    } catch(error) {
      if (error instanceof Error) {
        this.importArea = error.message;
      } else {
        this.importArea = JSON.stringify(error);
      }

      throw error;
    }

    this.importArea = 'ERFOLGREICH :)';
  }
}

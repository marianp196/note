import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SpaceService } from './services/space/space.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages: Promise<any[]>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private spaceRepo: SpaceService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.appPages = this.getPages(); 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private async getPages(): Promise<any[]> {
    const spaces = await this.spaceRepo.getAll();
    return spaces.map(s => {
      return {
        title: s.header,
        url: '/overview/' + s.id,
        icon: s.iconKey
      };
    });
  }
}

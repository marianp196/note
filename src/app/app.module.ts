import { NoteEditComponent } from './note-edit/note-edit.component';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { NoteOverviewComponent } from './note-overview/note-overview.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './note-overview/search.pipe';

@NgModule({
  declarations: [AppComponent, NoteOverviewComponent, NoteListItemComponent, NoteEditComponent, SearchPipe],
  entryComponents: [NoteEditComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

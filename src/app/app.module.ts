import { NoteEditComponent } from './note-edit/note-edit.component';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { SynchronizationComponent } from './synchronization/synchronization.component';
import { DatabaseService } from './services/core/storage/database.service';

export function initStorage(db: DatabaseService) {
  return async (): Promise<any> => { 
    db.schema = {
      dbName: 'notes',
      currentVersion: 3,
      tables: [
        {name: 'note'},
        {name: 'space'}
      ]
    }
    await db.openDatabaseAndUpdate();

    const repository = db.getStore('space');
    if((await repository.getAll()).length === 0) {
      await repository.create('ToDo', {id: 'ToDo', header: 'ToDos', iconKey: 'list', safe: false});
      await repository.create('Gedanken', {id: 'Gedanken', header: 'Gedanken', iconKey: 'list', safe: false});
      await repository.create('Serien', {id: 'Serien', header: 'Serien', iconKey: 'list', safe: false});
    }
  }
}

@NgModule({
  declarations: [AppComponent, NoteOverviewComponent,
    NoteListItemComponent, NoteEditComponent, SearchPipe, SynchronizationComponent],
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: initStorage, deps: [DatabaseService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

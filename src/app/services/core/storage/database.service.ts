import { Injectable } from '@angular/core';
import { DatabaseSchema } from './schema/databaseSchema.model';
import * as _ from 'lodash';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
  
  public schema: DatabaseSchema;
  private db: IDBDatabase;

  public async openDatabaseAndUpdate() {
    this.db = await this.getDatabase(true);
  }

  public getStore(storeName: string) {
    if (!this.db) {
      throw new Error('You need to open Database! Call openDatabaseAndUpdate()');
    }
    
    return new DataStoreService(this.db, storeName);
  }

  private getDatabase(updateSchema?: boolean): Promise<IDBDatabase> {
    if (!this.schema) {
      throw new Error('no schema set');
    }

    return new Promise((resolve, error) => {
      const request = this.windowDb.open(this.schema.dbName, this.schema.currentVersion);
      if (updateSchema) {
        request.onupgradeneeded = this.onUpgradeNeeded.bind(this);
      }

      request.onsuccess = (s: any) => {
        resolve(s.target.result);
      };
      request.onerror = e => error(e);
    })
  }

  private onUpgradeNeeded(event) {
    const db = event.target.result as IDBDatabase;
    const currentTables = db.objectStoreNames;

    for(const table of this.schema.tables) {
      if (!currentTables.contains(table.name)) {
        db.createObjectStore(table.name);
      }
    }
  }

  private get windowDb() {
    return window.indexedDB;
  }
}

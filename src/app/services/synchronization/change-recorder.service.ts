import { ChangeTrigger, ChangeType } from '../core/domain/changeTrigger';
import { DatabaseService } from '../core/storage/database.service';
import { DataStoreService } from '../core/storage/data-store.service';
import { Guid } from 'guid-typescript';

export class ChangeRecorderService implements ChangeTrigger{
  constructor(database: DatabaseService) { 
    this.store = database.getStore('synchro');
  }
  
  private store: DataStoreService;

  public async trackId(changeType: ChangeType, domainName: string, id: string): Promise<any> {
    const newId = Guid.create().toString();
    await this.store.create(newId, { id: newId, changeType, domainName, domainId: id});
    console.log('recorder', newId, changeType, domainName, id);
  }
}

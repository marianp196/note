import { Injectable } from '@angular/core';
import { ChangeTrigger, ChangeType } from '../core/domain/changeTrigger';


export class ChangeRecorderService implements ChangeTrigger{
  constructor() { }
  
  public async trackId(changeType: ChangeType, domainName: string, id: string): Promise<any> {
    console.log('recorder', changeType, domainName, id);
  }
}

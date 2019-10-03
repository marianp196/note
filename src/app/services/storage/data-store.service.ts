import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor(private db: IDBDatabase, private storeName: string) {}

  public async getAll(): Promise<any[]> {
    return new Promise((resolve, error) => {
      const request = this.objectStore.getAll()
      request.onsuccess = (e: any) => {
        resolve(e.target.result);
      };      
      request.onerror = (e: any) => this.handleError(e, error);
    });
  }

  public async getById(id: string): Promise<any> {
    return new Promise((resolve, error) => {
      const request = this.objectStore.get(id);
      request.onsuccess = (e: any) => {
        resolve(e.target.result);
      };      
      request.onerror = (e: any) => this.handleError(e, error);
    });
  }

  public async create(id: string, obj: any) {
    return new Promise((resolve, error) => {
      const request = this.objectStore.add(obj, id);
      request.onsuccess = e => resolve();      
      request.onerror = (e: any) => this.handleError(e, error);
    });
  }

  public async update(id: string, obj: any) {
    return new Promise((resolve, error) => {
      const request = this.objectStore.put(obj, id);
      request.onsuccess = e => resolve();      
      request.onerror = (e: any) => this.handleError(e, error);
    });
  }

  public async remove(id: string) {
    return new Promise((resolve, error) => {
      const request = this.objectStore.delete(id);
      request.onsuccess = e => resolve();      
      request.onerror = (e: any) => this.handleError(e, error);
    });
  }

  public async exists(id: string): Promise<boolean> {
    return new Promise((resolve, error) => {
      const request = this.objectStore.get(id);
      request.onsuccess = (e: any) => {
        resolve(e.target.result ? true : false);
      };      
      request.onerror = (e: any) => this.handleError(e, error);
    });
  }

  private get objectStore() {
    return this.db.transaction([this.storeName], 'readwrite')
    .objectStore(this.storeName);
  }

  private handleError(e: any, errorPromiseHandle) {
    if (e.target && e.target.error) {
      errorPromiseHandle(e.target.error);
    } else {
      errorPromiseHandle(e);
    }
  }
}

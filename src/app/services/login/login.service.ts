import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  public getNewLoginToken(password: string): string {
    if (password === '0000') {
      this.token = Guid.create().toString();
      return this.token;
    } else {
      return null;
    }
  }

  public isValidLoginToken(token: string): boolean {
    const valid = token && this.token && token === this.token;
    this.token = null;
    return valid;
  }

  private token: string;
}

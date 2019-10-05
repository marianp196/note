import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  public getNewLoginToken(password: string): string {
    if (password === '1968') {
      this.token = Guid.create().toString();
      return this.token;
    } else {
      return null;
    }
  }

  public isValidLoginToken(token: string): boolean {
    return token && this.token && token === this.token;
  }

  private token: string;
}

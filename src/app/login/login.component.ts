import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {}

  public inputStr: string;

  login() {
    const token = this.loginService.getNewLoginToken(this.inputStr);
    if (token) {
      this.router.navigate(['overview','Gedanken'], {
        queryParams: {
          token
        }
      })
    }
  }
}

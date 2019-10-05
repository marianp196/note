import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.password = new FormControl();
  }

  public password: FormControl;

  login() {
    const token = this.loginService.getNewLoginToken(this.password.value);
    if (token) {
      const route = this.getRoute();
      this.router.navigate(route , {
        queryParams: {
          token
        }
      })
    }
    this.password.setValue('');
  }

  private getRoute(): string[] {
    return this.activatedRoute.snapshot.queryParams.redirect || ['overview','ToDo'];
  }
}

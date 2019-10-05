import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SpaceService } from '../services/space/space.service';
import { LoginService } from '../services/login/login.service';

@Injectable(
  {providedIn: 'root'}
)
export class LoginGuard implements CanActivate {
  constructor(private spaceService: SpaceService, private loginService: LoginService, private router: Router) {}

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree>
  {
    const spaceID = route.params.space;
    if (!spaceID) {
      return true;
    }

    const space = await this.spaceService.get(spaceID);
    if (!space.safe) {
      return true;
    }

    const token = route.queryParams.token;
    console.log('guard', token);
    if (token && this.loginService.isValidLoginToken(token)) {
      return true;
    } else {
      return this.router.createUrlTree(['login'], {
        queryParams: {
          redirect: route.url.join('/')
        }
      });
    }
  }
}
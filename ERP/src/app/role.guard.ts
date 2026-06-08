import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
            return this.userService.getUserData().pipe(
              filter(val => val !== null), // Filter out initial Behaviour subject value
              take(1), // Otherwise the Observable doesn't complete!
              map(response => {
                this.userService.userinfos=response;
                const userRole = response.role;
                if(!route.data['roles'])
                {
                  return true;
                }
                else if (route.data['roles'] && route.data['roles'].includes(userRole)){
                  return true;
                }
                return false;
              }))


  }

}

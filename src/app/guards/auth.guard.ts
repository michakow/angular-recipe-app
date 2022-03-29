import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(route.url[0].path === 'recipes'){
      if(localStorage.getItem('logged')) return true;
      else {
        this.router.navigate(['login']);
        return false;
      }
    } else {
      if(!localStorage.getItem('logged')) return true;
      else {
        this.router.navigate(['login']);
        return false;
      }
    }
    // if (localStorage.getItem('logged') && route.url[0].path === 'recipes') return true;
    // else if (!localStorage.getItem('logged') && route.url[0].path === 'recipes') {
    //   this.router.navigate(['login']);
    //   return false;
    // } else if (localStorage.getItem('logged') && route.url[0].path === 'login') {
    //   this.router.navigate(['recipes']);
    //   return false;
    // } else if (!localStorage.getItem('logged') && route.url[0].path === 'login') {
    //   return true;
    // }
    // return false;
  }
}

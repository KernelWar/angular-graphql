import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private toast: MatSnackBar
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise((resolve, reject)=>{
      this.loginService.verifyToken().subscribe(res => {
        console.log('verify: ',res)
        if (res && res.message == "Token valid") {
          return resolve(true)
        }
        return resolve(false)
      }, err => {
        console.log(err.message)
        //this.toast.open("Server fail: "+ err.message, 'OK')
        return resolve(false)
      })
    })

  }

}

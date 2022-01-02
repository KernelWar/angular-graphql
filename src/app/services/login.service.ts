import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response, User } from '../pages/models/Response';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private headers: HttpHeaders
  public userLogIn: User
  constructor(
    private http: HttpClient,
    private toast: MatSnackBar,
    private router: Router
  ) { 
    this.headers = new HttpHeaders()
    this.headers.set('Content-Type','application/json')
    this.headers.set('Accept', '*/*')
    this.headers.set('Accept','application/json',)
  }

  private getPath(){
    if(environment.production){
      return `${environment.host}/`
    }else{
      return `${environment.host}:${environment.port}/`
    }    
  }

  login(username: string, password: string): Observable<Response>{
    return this.http.post<Response>(this.getPath()+"login", { username, password }, { headers: this.headers }).pipe(
      tap((res)=>{
      if(res && res.token && res.user && res.message == "User valid"){
        this.userLogIn = res.user
        localStorage.setItem('app-user', JSON.stringify(res.user))
        localStorage.setItem('app-token', res.token)
      }else{
        this.toast.open('Invalid username and/or password', null ,{
          duration: 3500
        })
      }
    }), catchError(err => {
      this.toast.open("Server fail: "+ err.message)
      return throwError(err)
    }))
  }

  verifyToken(): Observable<Response>{    
    let token = localStorage.getItem('app-token')
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    };    
    return this.http.post<Response>(this.getPath()+"verifyToken",{}, options). pipe(catchError(err => {
      if(err instanceof HttpErrorResponse && err.status == 401){
        this.toast.open('The session is invalid, please log in', null ,{
          duration: 4000
        })
        this.logout()
      }
      return throwError(err)
    }))
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  

}

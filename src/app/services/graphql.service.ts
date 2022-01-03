import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmployeeUpdate, Graphql } from '../pages/models/Employes';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  public options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  constructor(
    private http: HttpClient,
    private toast: MatSnackBar,
    private router: Router
  ) {
    
  }

  getEmployees(page: number, limit: number, search: string): Observable<Graphql> {
    let token = localStorage.getItem('app-token')
    this.options.headers['Authorization'] = 'Bearer ' + token
    let query = {
      query: `
        query ($limit: Int!, $page: Int!, $search: String!) {
          getEmployeeByKeyword(limit: $limit, page: $page, search: $search) {
            id_employee
            name
            last_name
            email
            nationality
            phone
            civil_status
            birthday
          },
          getCountEmployeeByKeyword(search: $search){
            length
          }
        }      
      `,
      variables: {
        page,
        limit,
        search
      }
    }
    return this.http.post<Graphql>(this.getPath()+"graphql", query, this.options).pipe(retry(3), catchError(err => {
      if(err instanceof HttpErrorResponse && err.status == 401){
        this.toast.open('The session is invalid, please log in', null ,{
          duration: 4000
        })
        localStorage.clear()
        this.router.navigate(['/login'])        
      }
      return throwError(err)
    }))
  }

  updateEmployee(id_employee: number, employeeUpdate: EmployeeUpdate): Observable<Graphql>{
    let token = localStorage.getItem('app-token')
    this.options.headers['Authorization'] = 'Bearer ' + token
    let query = {
      query: `
        mutation($id: Int!, $employee: EmployeeInput!){
          updateEmployee(id_employee: $id, input: $employee){
            id_employee,
            name,
            last_name,
            email,
            nationality,
            phone,
            civil_status,
            birthday
          }
        }
      `,
      variables: {
        id: id_employee,
        employee: employeeUpdate
      }
    }
    return this.http.post<Graphql>(this.getPath()+"graphql", query, this.options).pipe(catchError(err => {
      if(err instanceof HttpErrorResponse && err.status == 401){
        this.toast.open('The session is invalid, please log in', null ,{
          duration: 4000
        })        
        localStorage.clear()
        this.router.navigate(['/login'])  
      }
      return throwError(err)
    }))
  }

  private getPath(){
    if(environment.production){
      return `${environment.host}/`
    }else{
      return `${environment.host}:${environment.port}/`
    }    
  }

}

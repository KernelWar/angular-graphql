import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    private http: HttpClient
  ) {
    let token = localStorage.getItem('app-token')
    this.options.headers['Authorization'] = 'Bearer ' + token
  }

  getEmployees(page: number, limit: number, search: string): Observable<Graphql> {
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
    return this.http.post<Graphql>(this.getPath()+"/graphql", query, this.options)
  }

  updateEmployee(id_employee: number, employeeUpdate: EmployeeUpdate): Observable<Graphql>{
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
    return this.http.post<Graphql>(this.getPath()+"/graphql", query, this.options)
  }

  private getPath(){
    if(environment.production){
      return `${environment.host}/`
    }else{
      return `${environment.host}:${environment.port}/`
    }    
  }

}

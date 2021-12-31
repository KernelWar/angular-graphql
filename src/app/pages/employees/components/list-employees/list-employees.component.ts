import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/pages/models/Employes';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id_employee', 'name', 'last_name', 'email', 'nationality', 'phone', 'civil_status', 'birthday', 'accion'];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  employees: Employee [] = [{
    id_employee: 1,
    name: "Sayers Townshend",
    last_name: "Townshend",
    email: "stownshend0@privacy.gov.au",
    nationality: "Russia",
    phone: "485-583-5861",
    civil_status: "single",
    birthday: "11/15/2021"
  }, {
    id_employee: 2,
    name: "Tori Kenney",
    last_name: "Kenney",
    email: "tkenney1@auda.org.au",
    nationality: "Brazil",
    phone: "455-731-5155",
    civil_status: "divorced",
    birthday: "8/12/2021"
  }, {
    id_employee: 3,
    name: "Ilsa Bengochea",
    last_name: "Bengochea",
    email: "ibengochea2@google.it",
    nationality: "Japan",
    phone: "932-780-9239",
    civil_status: "widower",
    birthday: "6/8/2021"
  }, {
    id_employee: 4,
    name: "Lexis Pringle",
    last_name: "Pringle",
    email: "lpringle3@github.com",
    nationality: "Indonesia",
    phone: "291-490-2428",
    civil_status: "widower",
    birthday: "11/28/2021"
  }, {
    id_employee: 5,
    name: "Hy Simioli",
    last_name: "Simioli",
    email: "hsimioli4@issuu.com",
    nationality: "Czech Republic",
    phone: "451-560-0086",
    civil_status: "widower",
    birthday: "6/20/2021"
  }, {
    id_employee: 6,
    name: "Coretta Alvaro",
    last_name: "Alvaro",
    email: "calvaro5@nhs.uk",
    nationality: "Haiti",
    phone: "796-951-0245",
    civil_status: "single",
    birthday: "1/27/2021"
  }, {
    id_employee: 7,
    name: "Desmund Llopis",
    last_name: "Llopis",
    email: "dllopis6@xing.com",
    nationality: "China",
    phone: "935-337-7837",
    civil_status: "divorced",
    birthday: "4/28/2021"
  }, {
    id_employee: 8,
    name: "Stacie Espley",
    last_name: "Espley",
    email: "sespley7@huffingtonpost.com",
    nationality: "China",
    phone: "324-495-7796",
    civil_status: "widower",
    birthday: "8/1/2021"
  }, {
    id_employee: 9,
    name: "Debra Bertenshaw",
    last_name: "Bertenshaw",
    email: "dbertenshaw8@indiatimes.com",
    nationality: "Colombia",
    phone: "728-335-2165",
    civil_status: "single",
    birthday: "3/10/2021"
  }, {
    id_employee: 10,
    name: "Karlyn Fass",
    last_name: "Fass",
    email: "kfass9@businessweek.com",
    nationality: "Greece",
    phone: "232-304-4476",
    civil_status: "divorced",
    birthday: "12/15/2021"
  }]

  constructor() {
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

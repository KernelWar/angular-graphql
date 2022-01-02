import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/pages/models/Employes';
import * as moment from 'moment';

@Component({
  selector: 'app-card-employee',
  templateUrl: './card-employee.component.html',
  styleUrls: ['./card-employee.component.scss']
})
export class CardEmployeeComponent implements OnInit {
  @Input() employee: Employee
  constructor() { }

  ngOnInit(): void {
  }

  getFormatDate(birthday){    
    return moment(birthday).format("D MMMM")
  }

}

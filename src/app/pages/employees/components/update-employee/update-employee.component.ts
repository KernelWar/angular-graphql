import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/pages/models/Employes';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  @Input() employee: Employee
  public formEmployee: FormGroup
  constructor(
    private _form: FormBuilder
  ) {
    this.formEmployee = this._form.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
    })    
  }

  ngOnInit(): void {
    this.formEmployee.setValue({
      name: this.employee.name,
      last_name: this.employee.last_name,
      email: this.employee.email,
      phone: this.employee.phone
    })
  }

}

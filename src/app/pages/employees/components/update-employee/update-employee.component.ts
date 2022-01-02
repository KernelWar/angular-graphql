import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/pages/models/Employes';
import { GraphqlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  @Input() employee: Employee
  public formEmployee: FormGroup
  public LOAD: boolean = false
  constructor(
    private _form: FormBuilder,
    private graphqlService: GraphqlService,
    private toast: MatSnackBar,
    private matDialogRef: MatDialogRef<UpdateEmployeeComponent>
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

  updateEmployee(){
    this.LOAD = true
    this.formEmployee.disable()    
    this.graphqlService.updateEmployee(this.employee.id_employee, this.formEmployee.value).subscribe(res=> {
      if(res && res.data.updateEmployee){
        this.toast.open("User updated successfully", null, {
          duration: 3500
        })
        this.matDialogRef.close({
          update: true
        })
      }else{
        this.formEmployee.enable()
        this.LOAD = false
        this.toast.open("Try again later", null, {
          duration: 3500
        })
      }
    })
  }

}

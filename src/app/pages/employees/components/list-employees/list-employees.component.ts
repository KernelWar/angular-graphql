import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import { Employee } from 'src/app/pages/models/Employes';
import { GraphqlService } from 'src/app/services/graphql.service';
import { CardEmployeeComponent } from '../card-employee/card-employee.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['id_employee', 'name', 'last_name', 'email', 'nationality', 'phone', 'civil_status', 'birthday', 'accion'];
  public dataSource: MatTableDataSource<Employee> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public pageNow: number = 0
  public search: FormControl = new FormControl('')
  public length: number = 0
  public showHelp: boolean = false
  constructor(
    private dialog: MatDialog,
    private graphqlService: GraphqlService
  ) {    
  }

  ngOnInit(): void {   
    
  }

  getEmployees(){
    this.graphqlService.getEmployees(this.paginator.pageIndex+1, this.paginator.pageSize, this.search.value).subscribe(res=> {
      if(res.data.getEmployeeByKeyword != []){
        this.dataSource = new MatTableDataSource(res.data.getEmployeeByKeyword);
        this.paginator.length = res.data.getCountEmployeeByKeyword[0].length        
        this.length = res.data.getCountEmployeeByKeyword[0].length        
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;    
    this.dataSource.sort = this.sort;
    this.getEmployees()
    this.search.valueChanges.pipe(debounceTime(3000)).subscribe(res=> {
      if(res != ''){
        this.getEmployees()
        this.paginator.firstPage()                
      }
    })
    this.search.valueChanges.subscribe(res=> {
      if(res == ''){
        this.getEmployees()
        this.paginator.firstPage()
      }
    })
  }

  changePage(event: PageEvent){
    this.getEmployees()
  }

  showRow(row: Employee){
    const dialogRef = this.dialog.open(CardEmployeeComponent);
    dialogRef.componentInstance.employee = row    
  }

  @HostListener("click", ["$event"])
  clickFake(event){
    event.stopPropagation()
  }

  goToEdit(row: Employee){
    const dialogRef = this.dialog.open(UpdateEmployeeComponent);
    dialogRef.componentInstance.employee = row
    dialogRef.afterClosed().subscribe(result => {
      if(result && result['update']){
        this.getEmployees()
      }
    });
  }

  getFormatDate(birthday){    
    return moment(birthday).format("D MMMM")
  }
  activateColor(){
    this.showHelp = true
  }
  deactivateColor(){
    this.showHelp = false
  }
}

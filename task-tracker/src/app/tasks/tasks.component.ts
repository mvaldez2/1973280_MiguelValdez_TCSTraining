import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  employees:Array<Employee>=[];
  constructor(public employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.loadEmployeeDetails().subscribe(result=>this.employees=result,
      error=>console.log(error))
  }

}

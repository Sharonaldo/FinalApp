import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service :EmployeeService,
    private toaster:ToastrService) { }

  ngOnInit() {
    this.service.refreshlist();
  }

  populateForm(emp:Employee){
    this.service.formData= Object.assign({},emp);
  }

  onDelete(id:number){
    if(confirm('Are you sure you want to Delete tje Info?')){
    this.service.deleteEmployee(id).subscribe(res=>{
      this.service.refreshlist();
      this.toaster.info('Deleted Succesfully','EMP.Register');
    });
  }

  }

}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service:EmployeeService,
    private toaster:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData={
      EmployeeID:null,
      FullName:'',
      Position:'',
      EMPCode:'',
      Mobile:''
    }
  }

  onsubmit(form:NgForm){
    if(form.value.EmployeeID==null)
this.insertRecord(form);
    else
this.updateRecord(form);
  }

  insertRecord(form:NgForm){
 this.service.postEmployee(form.value).subscribe(res=>{
   this.toaster.success('insert Succesfully','EMP.Register');
   this.resetForm(form);
   this.service.refreshlist();

 });
  }

 updateRecord(form:NgForm){
   this.service.putEmployee(form.value).subscribe(res=>{
    this.toaster.warning('updated Succesfully','EMP.Register');
    this.resetForm(form);
    this.service.refreshlist();
  });
}

}

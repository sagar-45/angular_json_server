import { Component,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './Components/dialog/dialog.component';
import { ApiService } from './Service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crudOp';
  displayedColumns: string[] = ['Id','Name','Category','Date','Status','Price','Action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private dialog:MatDialog,private api:ApiService){};
  openForm(){
    const dialogRef = this.dialog.open(DialogComponent).
    afterClosed().subscribe(value=>{
      if(value==='save'){
        this.getData();
      }
    });
  }
  ngOnInit(){
    this.getData();
  }
  getData(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:()=>{
        alert("Error occured");
      }
    });
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      data:row
    }).afterClosed().subscribe(value=>{
      if(value==='update'){
        this.getData();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Product deleted successfully!!");
        this.getData();
      },
      error:()=>{
        alert("Error occured:Delete product");
      }
    })
  }
}

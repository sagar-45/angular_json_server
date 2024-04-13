import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  saveProduct(data:any){
    return this.http.post<any>("http://localhost:3000/product",data);
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/product");
  }
  editProduct(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/product/"+id,data);
  }
  deleteProduct(id:Number){
    return this.http.delete<any>("http://localhost:3000/product/"+id);
  }
}

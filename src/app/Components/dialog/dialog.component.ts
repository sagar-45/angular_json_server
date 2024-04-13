import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  Btntext: string = 'Save'
  constructor(private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>,) { }
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required])
  })
  categories = ['Fruits', "Electronics", 'Vegitables']
  statusList = ['New Product', "SecondHand Product"]
  ngOnInit(): void {
    if (this.editData) {
      this.Btntext = 'Update';
      this.form.controls['name'].setValue(this.editData.name);
      this.form.controls['category'].setValue(this.editData.category);
      this.form.controls['date'].setValue(this.editData.date);
      this.form.controls['status'].setValue(this.editData.status);
      this.form.controls['price'].setValue(this.editData.price);

    }
  }
  SaveData() {
    if (this.form.valid) {
      if (this.editData) {
        this.updateData();
      }
      else {
        this.api.saveProduct(this.form.value).subscribe({
          next: (res) => {
            alert("product added successfully!!");
            this.form.reset();
            this.dialogref.close('save');
          },
          error: () => {
            alert("Error occure in adding the product");
          }
        })
      }
    }
  }
  updateData(){
    this.api.editProduct(this.form.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Product update successfully!!");
        this.form.reset();
        this.dialogref.close("update");
      },
      error:()=>{
        alert("Error occured: update product");
      }
    })
  }
}

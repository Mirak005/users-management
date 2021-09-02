import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/models/User';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  userData: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl('')
  });


  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {

    if (this.data) {
      this.userData = new FormGroup({
        firstName: new FormControl(this.data.firstName),
        lastName: new FormControl(this.data.lastName),
        address: new FormControl(this.data.address),
        email: new FormControl(this.data.email),
      })
    }

  }



  setConfirmStatus(status: boolean, data?: any) {


    this.dialogRef.close({ status, data: data && { ...data.value, id: this.data.id } })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

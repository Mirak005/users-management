import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  formTitle: string = 'New User';
  userData: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formTitle = 'Edit User';
      this.userData = new FormGroup({
        firstName: new FormControl(this.data.firstName, [Validators.required]),
        lastName: new FormControl(this.data.lastName, [Validators.required]),
        address: new FormControl(this.data.address, [Validators.required]),
        email: new FormControl(this.data.email, [
          Validators.required,
          Validators.email,
        ]),
      });
    }
  }

  onConfrimClick(): void {
    this.dialogRef.close({
      status: true,
      data: this.data
        ? { ...this.userData.value, id: this.data.id }
        : this.userData.value,
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }
}

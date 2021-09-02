import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


import { UserFormComponent } from "../components/user-form/user-form.component";
import { ConfirmDeleteComponent } from '../components/confirm-delete/confirm-delete.component';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }


  confirmRemoveUser(): MatDialogRef<any> {

    return this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
    });

  }


  openEditUser(user: IUser): MatDialogRef<any> {

    return this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { ...user }
    });

  }


  openAddUser(): MatDialogRef<any> {

    return this.dialog.open(UserFormComponent, {
      width: '400px',
    });

  }


}

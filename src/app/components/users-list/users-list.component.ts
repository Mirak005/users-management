import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { IUser } from '../../models/User';
import { DialogService } from 'src/app/services/dialog.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'address',
    'id',
    'edit',
    'delete',
  ];
  dataSource: IUser[] = [];
  loading: boolean = true;

  constructor(
    private usersService: UsersService,
    private dialogService: DialogService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(
      (users) => {
        this.dataSource = users;
        this.loading = false;
      },
      (err) => this.alertService.openSnackBar(err.statusText, true)
    );
  }

  removeUser(user: IUser): void {
    this.dialogService
      .confirmRemoveUser()
      .afterClosed()
      .subscribe((result) => {
        if (!result || !result.status) {
          return;
        }

        this.usersService.removeUser(user).subscribe(
          () => {
            this.dataSource = this.dataSource.filter(
              (item) => item.id !== user.id
            );
            this.alertService.openSnackBar('User removed with success', false);
          },
          (err) => this.alertService.openSnackBar(err.statusText, true)
        );
      });
  }

  updateUser(user: IUser): void {
    this.dialogService
      .openEditUser(user)
      .afterClosed()
      .subscribe((result) => {
        if (!result || !result.status) {
          return;
        }

        this.usersService.editUser(result.data).subscribe(
          (_) => {
            this.dataSource = this.dataSource.map((user) =>
              user.id === result.data.id ? result.data : user
            );
            this.alertService.openSnackBar('User updated with success', false);
          },
          (err) => this.alertService.openSnackBar(err.statusText, true)
        );
      });
  }

  addUser() {
    this.dialogService
      .openAddUser()
      .afterClosed()
      .subscribe((result) => {
        if (!result || !result.status) {
          return;
        }

        this.usersService.addUser(result.data).subscribe(
          (newUser) => {
            this.dataSource = [...this.dataSource, newUser];
            this.alertService.openSnackBar('User added with success', false);
          },

          (err) => this.alertService.openSnackBar(err.statusText, true)
        );
      });
  }
}

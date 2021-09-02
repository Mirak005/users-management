import { Component, OnInit } from "@angular/core";

import { UsersService } from "src/app/services/users.service";
import { IUser } from "../../models/User"
import { DialogService } from "src/app/services/dialog.service";





@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'address',
    'id',
    'edit',
    'delete'
  ];
  dataSource: IUser[] = [];
  loading: boolean = true;



  constructor(
    private usersService: UsersService,
    private dialogService: DialogService

  ) { }


  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(): void {

    this.usersService.getUsers().subscribe(users => {
      this.dataSource = users
      this.loading = false;
    })

  }



  removeUser(user: IUser): void {

    this.dialogService.confirmRemoveUser().afterClosed().subscribe(result => {

      if (!result || !result.status) {
        return;
      }

      this.usersService.removeUser(user).subscribe(() => {

        this.dataSource = this.dataSource.filter(item => item.id !== user.id);

      })
    })

  }



  updateUser(user: IUser): void {

    this.dialogService.openEditUser(user).afterClosed().subscribe(result => {
      if (!result || !result.status) {
        return;
      }

      this.usersService.editUser(result.data).subscribe(_ => {
        this.dataSource = this.dataSource.map(user => user.id === result.data.id ? result.data : user);
      });

    });
  };



  addUser() {

    this.dialogService.openAddUser().afterClosed().subscribe(result => {
      if (!result || !result.status) {
        return;
      }

      this.usersService.addUser(result.data)
        .subscribe(newUser => {
          this.dataSource = [...this.dataSource, newUser]
        })

    });

  }


}

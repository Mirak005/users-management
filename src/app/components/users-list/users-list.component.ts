import { Component, OnInit } from "@angular/core";

import { UsersService } from "src/app/services/users.service";
import { IUser } from "../../models/User"





@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'address', 'id', 'edit', 'delete'];
  dataSource: IUser[] = [];
  loading: boolean = true;



  constructor(
    private usersService: UsersService
  ) { }




  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(): void {

    this.usersService.getUsers().subscribe(users => {
      console.log(users)
      this.dataSource = users
      this.loading = false;
    })
  }



  removeUser(user: IUser): void {
    this.usersService.removeUser(user).subscribe(() => {
      this.dataSource = this.dataSource.filter(item => item.id !== user.id)
    })
  }

}

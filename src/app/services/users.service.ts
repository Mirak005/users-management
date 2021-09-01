import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: IUser[] = []

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private usersURL = 'api/users';

  constructor(
    private http: HttpClient
  ) { }


  /**
   * 
   * @desc get users 
   */
  getUsers(): Observable<IUser[]> {

    return this.http.get<IUser[]>(this.usersURL, this.httpOptions)

  }


  /**
   * @desc remove user 
   */
  removeUser(user: IUser): Observable<any> {

    const url = `${this.usersURL}/${user.id}`;
    return this.http.delete(url, this.httpOptions)

  }

  /**
 * @desc edit user 
 */
  editUser(editedUser: IUser): Observable<any> {

    const url = `${this.usersURL}/${editedUser.id}`;
    return this.http.put(url, editedUser, this.httpOptions)

  }



  /**
   * @desc add user 
   */

  addUser(newUser: IUser): Observable<any> {

    return this.http.post(this.usersURL, newUser, this.httpOptions)

  }


}

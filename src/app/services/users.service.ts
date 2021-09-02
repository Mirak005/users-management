import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: IUser[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}
  private usersURL = 'api/users';

  handleError(error: any) {
    return throwError(error);
  }

  /**
   *
   * @desc get users
   */
  getUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(this.usersURL, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * @desc remove user
   */
  removeUser(user: IUser): Observable<any> {
    const url = `${this.usersURL}/${user.id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * @desc edit user
   */
  editUser(editedUser: IUser): Observable<any> {
    const url = `${this.usersURL}/${editedUser.id}`;
    return this.http
      .put(url, editedUser, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * @desc add user
   */

  addUser(newUser: any): Observable<any> {
    return this.http
      .post(this.usersURL, newUser, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IUser } from '../models/User';


@Injectable({
  providedIn: 'root',
})

export class InMemUserService implements InMemoryDbService {
  createDb() {
    let users = [
      { firstName: "Karim", lastName: "Gharbi", email: "karim@gmail.com", address: "88 rue beskra mourouj", id: 0 },
      { firstName: "Yosr", lastName: "Lassoued", email: "yosr@gmail.com", address: "imeuble narjess ariana", id: 1 },
      { firstName: "Hejer", lastName: "Laouani", email: "hejer@gmail.com", address: "cité les canards raoued", id: 2 }
    ];
    return { users };
  }

  genId(users: IUser[]): number {
    return users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 11;
  }
}
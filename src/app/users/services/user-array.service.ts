import { Injectable } from '@angular/core';

import { User } from './../../models/user';

const userList = [
  new User(1, 'Anna', 'Borisova'),
  new User(2, 'Boris', 'Vlasov'),
  new User(3, 'Gennadiy', 'Dmitriev')
];

const userListPromise = Promise.resolve(userList);

@Injectable()
export class UserArrayService {
  getUsers(): Promise<User[]> {
    return userListPromise;
  }

  getUser(id: number | string): Promise<User> {
    return this.getUsers()
      .then(users => users.find(user => user.id === +id))
      .catch(() => Promise.reject('Error in getUser method'));
  }

  addUser(user: User): void {
    userList.push(user);
  }

  updateUser(user: User): void {
    let i = -1;

    userList.forEach((item, index) => {
      if (item.id === user.id ) {
        i = index;
        return false;
      }
    });

    if (i > -1) {
      userList.splice(i, 1, user);
    }
  }
}

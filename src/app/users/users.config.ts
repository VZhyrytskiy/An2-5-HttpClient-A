import { InjectionToken } from '@angular/core';

export const UsersAPI = new InjectionToken<string>('UsersAPI');
export const usersBaseUrl = 'http://localhost:3000/users';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userName: string = '';
  logged: boolean = false;

  constructor(private http: HttpClient) {}

  signIn(login: string, password: string) {
    return this.http.post<User>('http://localhost:3000/users', { login, password });
  }

  getName() {
    return this.userName;
  }

  isLogged() {
    return this.logged;
  }
}

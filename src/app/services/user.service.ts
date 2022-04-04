import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userName: string = localStorage.getItem('userName') ? JSON.parse(localStorage.getItem('userName')!) : '';
  logged: boolean = this.userName ? true : false;
  role: string = localStorage.getItem('userRole') ? JSON.parse(localStorage.getItem('userRole')!) : '';

  constructor(private http: HttpClient) {}

  signIn(login: string, password: string) {
    return this.http.get<User[]>(`http://localhost:3000/users?name=${login}&password=${password}`).pipe(
      map((res) => {
        if (res.length === 0) return false;
        else {
          this.userName = res[0].name;
          this.role = res[0].role;
          localStorage.setItem('userName', JSON.stringify(this.userName));
          localStorage.setItem('userRole', JSON.stringify(this.role));
          this.logged = true;
          return true;
        }
      })
    );
  }

  getName() {
    return this.userName;
  }

  isLogged() {
    return this.logged;
  }

  getRole() {
    return this.role;
  }
}

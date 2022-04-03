import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userName: string = localStorage.getItem('userName') || '' ;
  logged: boolean = this.userName ? true : false;
  constructor(private http: HttpClient) {}

  signIn(login: string, password: string) {
    return this.http.get<User[]>(`http://localhost:3000/users?name=${login}&password=${password}`).pipe(
      map(res => {
        if(res.length === 0) return false;
        else {
          this.userName = res[0].name;
          localStorage.setItem('userName', JSON.stringify(this.userName));
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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Entity/Users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://localhost:8080/todoapp/';

  constructor(private http: HttpClient) {}

  LoginCheck(user: Users) {
    return this.http.post(this.url + "login", user);
  }
}

import { Injectable } from '@angular/core';
import { Users } from '../Entity/Users';

const userKey = "auth-user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }

  saveSession(userData:any){
    window.localStorage.removeItem(userKey)
    window.localStorage.setItem(userKey,JSON.stringify(userData));
    // window.location.reload();

  }

  getData(){
    const user = window.localStorage.getItem(userKey)
    return JSON.parse(user!);
  }

  getRole(){
    let role = this.getData().userRole;
    return role;
  }
  clearData(){
    window.localStorage.clear();
    // window.location.reload();
    
  }

}

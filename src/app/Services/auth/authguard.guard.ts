import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
// const 
export class AuthguardGuard implements CanActivate {

private usedLoginCeck = this.storage.getData();

constructor(
  private storage:StorageService,
  private router:Router
){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.usedLoginCeck == null){
      alert("You are not authenticate to view this page, Please Login First")
      this.router.navigateByUrl("/login");
    }

    // else{
    //   this.router.navigateByUrl("/todolist");
    // }
    
      return true;
  }


  
}

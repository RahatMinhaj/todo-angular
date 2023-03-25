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
      this.router.navigateByUrl("/login");
    }
    
      return true;
  }


  
}

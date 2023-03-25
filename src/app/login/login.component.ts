import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../Services/storage.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // private userRole = ''
  // private userPanel = false;
  // private adminPanel = false;

  adminPanel = false;

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private storage: StorageService,
    private router: Router
  ) {}
  private usedLoginCeck!: any;

  ngOnInit(): void {
    this.usedLoginCeck = this.storage.getData();
    if (this.usedLoginCeck != null) {
      this.router.navigateByUrl('/todolist');
    }
    this.loginForm = this.formBuilder.group({
      userName: [''],
      userPass: [''],
    });
  }

  loginCheck() {
    if (this.loginForm.valid) {
      this.userService.LoginCheck(this.loginForm.value).subscribe(
        (data) => {
          this.storage.saveSession(data);

          if (this.storage.getRole() === 'admin') {
            this.adminPanel = true;
            this.router.navigateByUrl('/todolist');
          } else if (this.storage.getRole() === 'user') {
            this.adminPanel = false;
            this.router.navigateByUrl('/todolist');
          }
          location.reload();
        },
        (error) => {
          alert('username and password is not valid');
        }
      );
    }
  }
}

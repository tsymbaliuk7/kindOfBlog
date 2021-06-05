import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public input: any;

  public errors: any;

  constructor(public userService: UserService, public title: Title, private router: Router) {
    title.setTitle('Login')
  }

  ngOnInit() {
    this.input = {
      username: '',
      email: '',
      password: '',
    }
    this.errors = {
      email: [],
      password: [],
      username: [],
    }

  }

  toRegister(){
    this.userService.registerUser(this.input).subscribe(
        response => {
          alert('User' + this.input.username + 'has been registered')
          this.errors = {
            email: [],
            password: [],
            username: [],
          }
        },
        error => {
          this.errors = {
            email: error.error.email ? error.error.email : [],
            password: error.error.password ? error.error.password : [],
            username: error.error.username ? error.error.username : [],
          }
        }
    );
    this.router.navigate(['']);
  }

  refreshToken() {
    this.userService.refreshToken();
  }

  toLogout() {
    this.userService.logout();
  }

}

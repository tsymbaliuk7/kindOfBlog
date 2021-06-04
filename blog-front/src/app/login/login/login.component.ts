import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public input: any;
  title = ''

  public errors: any;

  constructor(public userService: UserService) {

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
  }

  toLogin(){
    this.userService.login(this.input);
  }

  refreshToken() {
    this.userService.refreshToken();
  }

  toLogout() {
    this.userService.logout();
  }

}

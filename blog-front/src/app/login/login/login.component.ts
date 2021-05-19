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

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.input = {
      username: '',
      email: '',
      password: '',
    }
  }

  toRegister(){
    this.userService.registerUser(this.input).subscribe(
        response => {
          alert('User' + this.input.username + 'has been registered')
        },
        error =>
          console.log('error', error)
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

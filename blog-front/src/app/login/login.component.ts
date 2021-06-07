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
      email: '',
      password: '',
    }
    this.errors = {
      email: [],
      password: [],
      error: []
    }

  }

  toLogIn(){
     this.userService.login(this.input).subscribe(
      data => {
        this.errors = {
            email: [],
            password: [],
            error: []
          }
          this.userService.updateData(data.user.token)
          delete data.user.password
          localStorage.setItem('auth_token', JSON.stringify(data.user))
          this.router.navigate(['']);
      },
      error => {
         this.errors = {
            email: error.error.user.email ? error.error.user.email : [],
            password: error.error.user.password ? error.error.user.password : [],
            error: error.error.user.error ? error.error.user.error : [],
          }
      }
    );
  }


}

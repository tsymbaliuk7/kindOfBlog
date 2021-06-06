import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {PostsComponent} from "./posts/posts.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
    {path: '', component: PostsComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

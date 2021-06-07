import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {PostsComponent} from "./posts/posts.component";
import {RegisterComponent} from "./register/register.component";
import {AllUsersComponent} from "./all-users/all-users.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
    {path: 'profile/:userId', component: PostsComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'all-users', component: AllUsersComponent},
    {path: '**', component: NotFoundComponent},
    {path: '404', redirectTo: '**'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

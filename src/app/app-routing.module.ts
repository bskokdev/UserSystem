import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailsComponent} from "./components/user/user-details/user-details.component";
import {UsersViewComponent} from "./components/user/users-view/users-view.component";
import {ExportsPageComponent} from "./components/export/exports-page/exports-page.component";

const routes: Routes = [
  {path: '', redirectTo: "/users", pathMatch: "full"},
  {path: 'users/:id', component: UserDetailsComponent},
  {path: 'users', component: UsersViewComponent},
  {path: 'exports', component: ExportsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

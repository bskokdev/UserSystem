import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {ExportsComponent} from './components/export/exports/exports.component';
import {ExportedListComponent} from './components/export/exported-list/exported-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {UserDetailsComponent} from './components/user/user-details/user-details.component';
import {UsersViewComponent} from './components/user/users-view/users-view.component';
import {AddUserFormComponent} from './components/user/add-user-form/add-user-form.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ExportsPageComponent} from './components/export/exports-page/exports-page.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {CustomInputComponent} from "./components/custom-input/custom-input.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponent,
    ExportsComponent,
    ExportedListComponent,
    UserDetailsComponent,
    UsersViewComponent,
    AddUserFormComponent,
    ExportsPageComponent,
    CustomInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ModalModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

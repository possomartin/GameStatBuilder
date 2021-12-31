import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { ProfileComponent } from './views/profile/profile.component';
import { UsersComponent } from './views/users/users.component';
import { AddUserComponent } from './views/add-user/add-user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebInterceptorService } from './services/web-interceptor.service';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { IdToNamePipe } from './pipes/id-to-name.pipe';
import { RolesComponent } from './views/roles/roles.component';
import { EditRoleComponent } from './views/edit-role/edit-role.component';
import { AddRoleComponent } from './views/add-role/add-role.component';
import { AddCategoryComponent } from './views/add-category/add-category.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { EditCategoryComponent } from './views/edit-category/edit-category.component';
import { EditStatComponent } from './views/edit-stat/edit-stat.component';
import { StatsComponent } from './views/stats/stats.component';
import { AddStatComponent } from './views/add-stat/add-stat.component';
import { GamesComponent } from './views/games/games.component';
import { EditGameComponent } from './views/edit-game/edit-game.component';
import { AddGameComponent } from './views/add-game/add-game.component';
import { ItemsComponent } from './views/items/items.component';
import { AddItemComponent } from './views/add-item/add-item.component';
import { EditItemComponent } from './views/edit-item/edit-item.component';
import { BoostsComponent } from './views/boosts/boosts.component';
import { AddBoostComponent } from './views/add-boost/add-boost.component';
import { EditBoostComponent } from './views/edit-boost/edit-boost.component';
import { TrackByPropertyPipe } from './pipes/track-by-property.pipe';
import { GamestatsComponent } from './views/gamestats/gamestats.component';
import { EditGamestatComponent } from './views/edit-gamestat/edit-gamestat.component';
import { AddGamestatComponent } from './views/add-gamestat/add-gamestat.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    UsersComponent,
    AddUserComponent,
    LoginComponent,
    RegisterComponent,
    EditUserComponent,
    IdToNamePipe,
    RolesComponent,
    EditRoleComponent,
    AddRoleComponent,
    AddCategoryComponent,
    CategoriesComponent,
    EditCategoryComponent,
    EditStatComponent,
    StatsComponent,
    AddStatComponent,
    GamesComponent,
    EditGameComponent,
    AddGameComponent,
    ItemsComponent,
    AddItemComponent,
    EditItemComponent,
    BoostsComponent,
    AddBoostComponent,
    EditBoostComponent,
    TrackByPropertyPipe,
    GamestatsComponent,
    EditGamestatComponent,
    AddGamestatComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: WebInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

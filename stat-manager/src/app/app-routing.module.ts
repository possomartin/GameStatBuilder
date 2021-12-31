import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBoostComponent } from './views/add-boost/add-boost.component';
import { AddCategoryComponent } from './views/add-category/add-category.component';
import { AddGameComponent } from './views/add-game/add-game.component';
import { AddGamestatComponent } from './views/add-gamestat/add-gamestat.component';
import { AddItemComponent } from './views/add-item/add-item.component';
import { AddRoleComponent } from './views/add-role/add-role.component';
import { AddStatComponent } from './views/add-stat/add-stat.component';
import { AddUserComponent } from './views/add-user/add-user.component';
import { BoostsComponent } from './views/boosts/boosts.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { EditBoostComponent } from './views/edit-boost/edit-boost.component';
import { EditCategoryComponent } from './views/edit-category/edit-category.component';
import { EditGameComponent } from './views/edit-game/edit-game.component';
import { EditGamestatComponent } from './views/edit-gamestat/edit-gamestat.component';
import { EditItemComponent } from './views/edit-item/edit-item.component';
import { EditRoleComponent } from './views/edit-role/edit-role.component';
import { EditStatComponent } from './views/edit-stat/edit-stat.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';
import { GamesComponent } from './views/games/games.component';
import { GamestatsComponent } from './views/gamestats/gamestats.component';
import { HomeComponent } from './views/home/home.component';
import { ItemsComponent } from './views/items/items.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';
import { RolesComponent } from './views/roles/roles.component';
import { StatsComponent } from './views/stats/stats.component';
import { UsersComponent } from './views/users/users.component';

const routes: Routes = [
  {path: '', redirectTo: '/admin/users', pathMatch: 'full'},
  {path: 'admin/profile', component: ProfileComponent},
  {path: 'admin/users', component: UsersComponent},
  {path: 'admin/add-user', component: AddUserComponent},
  {path: 'admin/users/:id/edit-user', component: EditUserComponent},
  {path: 'admin/roles', component: RolesComponent},
  {path: 'admin/add-role', component: AddRoleComponent},
  {path: 'admin/roles/:id/edit-role', component: EditRoleComponent},
  {path: 'admin/categories', component: CategoriesComponent},
  {path: 'admin/categories/:id/edit-category', component: EditCategoryComponent},
  {path: 'admin/add-category', component: AddCategoryComponent},
  {path: 'admin/stats', component: StatsComponent},
  {path: 'admin/add-stat', component: AddStatComponent},
  {path: 'admin/stats/:id/edit-stat', component: EditStatComponent},
  {path: 'admin/games', component: GamesComponent},
  {path: 'admin/add-game', component: AddGameComponent},
  {path: 'admin/games/:id/edit-game', component: EditGameComponent},
  {path: 'admin/items', component: ItemsComponent},
  {path: 'admin/items/:id/edit-item', component: EditItemComponent},
  {path: 'admin/add-item', component: AddItemComponent},
  {path: 'admin/boosts', component: BoostsComponent},
  {path: 'admin/add-boost', component: AddBoostComponent},
  {path: 'admin/boosts/:id/edit-boost', component: EditBoostComponent},
  {path: 'admin/gamestats', component: GamestatsComponent},
  {path: 'admin/add-gamestat', component: AddGamestatComponent},
  {path: 'admin/gamestats/:id/edit-gamestat', component: EditGamestatComponent},
  {path: 'gamestats/home', component: HomeComponent},
  {path: 'gamestats/home/:id', component: HomeComponent},
  {path: 'gamestats/home/:id/:item', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

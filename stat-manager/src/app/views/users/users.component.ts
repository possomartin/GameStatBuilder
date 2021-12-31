import { Component, OnInit, Pipe } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  /* Get All Users */
  getAllUsers()
  {
    this.admin.getAllUsers().subscribe((users: any) => {
      this.users = users; 
      this.IdToName();
    });
  }

  /* Set ID to Name */

  IdToName()
  {
    this.users.map(user => this.admin.getRoleByID(user._roleId).subscribe((role: any) => {
      user.rolename = role.name;
    }));
  }

  /* Get Role by ID */

  /* Delete User */
  deleteUser(id: string)
  {
    this.admin.deleteUser(id).subscribe((user: any) => {
      this.router.navigate(['/admin/users']).then(() => window.location.reload());
      console.log(user);
    });
  }

  trackByIndex(index: number, item: any) {return index;}
}

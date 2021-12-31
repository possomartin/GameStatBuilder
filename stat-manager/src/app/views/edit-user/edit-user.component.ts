import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userID!: string;
  roles!: any[];

  selectedUser!: any;

  constructor(private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    /* Set Variable with Params */

    this.route.params.subscribe(
      (params: Params) => {
        this.userID = params.id;
      }
    );

    this.getRoles();

    this.getUserByID();
  }

  getUserByID()
  {
    this.admin.getUserByID(this.userID).subscribe((user: any) => {
      this.selectedUser = user;
      console.log(this.selectedUser);
    });
  }

  getRoles()
  {
    this.admin.getAllRoles().subscribe((roles: any) => {
      this.roles = roles;
      console.log(roles);
    });
  }

  updateUser(name: string, lastname: string, username: string, email: string, _roleId: string)
  {
    this.admin.updateUser(this.userID, name, lastname, username, email, _roleId).subscribe((user: any) => {
      console.log(user);
      this.router.navigate(['/admin/users']);
    });
  }
}

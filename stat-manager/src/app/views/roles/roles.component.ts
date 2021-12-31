import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  /* Get All Roles */
  getAllRoles()
  {
    this.admin.getAllRoles().subscribe((roles: any) =>
    {
      console.log(roles);
      this.roles = roles;
    });
  }

  /* Get Role by ID */
  getRoleByID(id: string)
  {
    let name = "";
    this.admin.getRoleByID(id).subscribe((role: any) => name = role.name);

    return name;
  }

  /* Delete User */
  deleteRole(id: string)
  {
    this.admin.deleteRole(id).subscribe((role: any) => {
      this.router.navigate(['/admin/roles']).then(() => window.location.reload());
      console.log(role);
    });
  }
}

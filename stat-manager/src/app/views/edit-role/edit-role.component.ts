import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  selectedRole!: any;
  roleID!: string;

  constructor(private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* Set Variable with Params */

    this.route.params.subscribe(
      (params: Params) => {
        this.roleID = params.id;
      }
    );

    this.getRoleByID();
  }

  getRoleByID()
  {
    this.admin.getRoleByID(this.roleID).subscribe((role: any) => this.selectedRole = role);
  }

  updateRole(name: string)
  {
    this.admin.updateRole(this.roleID, name).subscribe((role: any) => {
      console.log(role)
      this.router.navigate(['/admin/roles']);
    });
  }

}

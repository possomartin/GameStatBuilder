import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  addRole(name: string)
  {
    this.admin.createRole(name).subscribe((role: any) => {
      console.log(role);
      this.router.navigate(['/admin/roles']);
    });
  }
}

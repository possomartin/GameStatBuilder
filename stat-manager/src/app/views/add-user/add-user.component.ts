import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  roles!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles()
  {
    this.admin.getAllRoles().subscribe((roles: any) => {
      this.roles = roles;
      console.log(roles);
    });
  }

  addUser(name: string, lastname: string, username: string, email: string, password:string, roleID: string)
  {
    this.admin.createUser(name, lastname, username, email, password, roleID).subscribe((user: any) => {
      console.log(user);
      this.router.navigate(['/admin/users']);
    });
  }

}

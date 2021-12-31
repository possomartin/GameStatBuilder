import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private admin: AdminService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  RegisterUser(name: string, lastname: string, username: string, email: string, password: string)
  {
    this.admin.createUser(name, lastname, username, email, password, "61873619cad4820d3795e6ac").subscribe((user: any) => {
      console.log(user)
      this.router.navigate(['/login']);
    });
  }

  getUserByName(username: string)
  {
    this.auth.getUserByUsername('posso_martin').subscribe((user: any) => {
      console.log(user);
    });
  }

}

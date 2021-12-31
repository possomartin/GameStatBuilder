import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedUser!: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  OnLoginSubmit(username: string, password: string)
  {
    this.authService.userLogin(username, password).subscribe(data => {
      console.log(data);
      this.loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if(this.loggedUser._roleId == "618732e84ac13f5361714794")
      {
        this.router.navigate(['/admin/users']);
      }
      else
      {
        this.router.navigate(['/gamestats/home']);
      }
    }, error => {
      this.router.navigate(['/login']);
    });
  }  
}

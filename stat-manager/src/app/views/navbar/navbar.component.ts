import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isUserAdmin!: boolean;
  user!: any;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    if(this.user._roleId == "618732e84ac13f5361714794")
    {
      this.isUserAdmin = true;
    }
    else
    {
      this.isUserAdmin = false;
    }
    
  }

  onLogOutSumbit()
  {
    this.authService.logout().subscribe(() => {
      console.log('Log Out');
    });
  }
}

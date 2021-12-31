import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private webReqService: WebRequestService, private router: Router) { }

  userRegister(username: string, email: string, password: string)
  {
    return this.webReqService.post('users/register', {username, email, password});
  }

  userLogin(username: string, password: string)
  {
    return this.webReqService.login(username, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.storeUserData(res.body);
      })
    );
  }

  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    return this.webReqService.post('users/logout', {});
  }

  getUserByUsername(username: string)
  {
    return this.webReqService.get(`users/${username}`);
  }

  storeUserData(user: any)
  {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

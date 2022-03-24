import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signIn(username: string = '', password: string = ''): void {
    if(!username || !password) return
    
    this.http.post(`${environment.backend}/sign-in`, { username, password }).subscribe(data => {
      if(data){
        sessionStorage.setItem('username', username)
        this.router.navigateByUrl('/chat')
      }
    })
  }
}

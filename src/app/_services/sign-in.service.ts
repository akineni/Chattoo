import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  signInStatus: boolean = false

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signIn(username: string = '', password: string = ''): void {
    if(!username || !password) return
    
    this.http.post(`${environment.backend}/sign-in`, { username, password }).subscribe(data => {
      if(data){
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('_id', (<any>data)._id)
        sessionStorage.setItem('avatar', (<any>data).avatar)
        this.router.navigateByUrl('/chat')
      }else {
        this.signInStatus = true
      }
    })
  }
}

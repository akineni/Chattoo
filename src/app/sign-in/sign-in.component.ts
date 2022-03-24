import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { SignInService } from '../_services/sign-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  username: any; password: any
  env = environment

  constructor(
    private titleService: Title,
    private signInService: SignInService
    ) { 
    titleService.setTitle(environment.appName + ': Login')
  }

  signIn(): void {
    this.signInService.signIn(this.username, this.password)
  }

}

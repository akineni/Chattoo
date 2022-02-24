import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.appName
  env = environment
  search: any = ''
  
  constructor(
    public userService: UserService,
    private socketService: SocketService
  ) { }

  selectUser(event: Event) {
    this.userService.select(event)
  }

}
import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MessageService } from './services/message.service';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  env = environment //For use in view (.html)
  search: any = ''
  
  constructor(
    public userService: UserService,
    private socketService: SocketService,
    private messageService: MessageService,
    private titleService: Title
  ) {
    titleService.setTitle(environment.appName)
   }

  selectUser(event: Event) {
    this.userService.select(event)
  }

  sendMessage() {
    this.messageService.send()
  }

}
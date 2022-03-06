import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  env = environment //For use in view (.html)
  search: string = ''
  
  constructor(
    public userService: UserService,
    private messageService: MessageService
  ) {}

  selectUser(event: Event) {
    this.userService.select(event)
  }

  sendMessage() {
    this.messageService.send()
  }

}
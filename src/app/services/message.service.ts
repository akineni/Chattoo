import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocketService } from './socket.service';
import { UserService } from './user.service';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private socketService: SocketService
  ) { }

  send(): void {
    this.http.post(`${environment.backend}/message`, {
      to: this.userService.currentUser,
      from: this.socketService.socket.id,
      msg: $('textarea').val()
    }).subscribe(data => {
        $('.chat-history ul.m-b-0').append(`
        <li class="clearfix">
        <div class="message-data text-right">
            <span class="message-data-time">10:10 AM, Today</span>
        </div>
        <div class="message other-message float-right"> ${$('textarea').val()} </div>
    </li>`)
      
      $('textarea').val('')
    })
  }

  receive(): void {
    this.http.get(`${environment.backend}/message`).subscribe(data => {
      console.log(data)
    })
  }
}

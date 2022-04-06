import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { UserService } from './user.service';

declare var $:any;

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(
    private userService: UserService,
    private socketService: SocketService
  ) {
    this.socketService.socket.on('receive', (sId, msg) => {
      this.receive(sId, msg)
    })
  }

  send(): void {

    if($('textarea').val() == '') return

    let msg = {
      body: $('textarea').val().trim(),
      time: new Date()
    }
    
    this.socketService.socket.emit('send', this.userService.currentUser.sId, msg, () => {
      $('.chat-history ul.m-b-0').append(`
        <li class="clearfix">
          <div class="message-data text-right">
              <span class="message-data-time">${ new Intl.DateTimeFormat('default', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
              }).format(msg.time) }</span>
          </div>
          <div class="message my-message float-right">${ msg.body }</div>
        </li>
      `)
      
      $('textarea').val('')
      $('.chat-history').scrollTop($('.chat-history').prop('scrollHeight'))
    })

  }

  receive(sId: any, msg: any): void {
    if(this.userService.currentUser != undefined && this.userService.currentUser.sId == sId){
      $('.chat-history ul.m-b-0').append(`
      <li class="clearfix">
        <div class="message-data">
            <img src="${ this.userService.currentUser.avatar }" alt="avatar">
            <span class="message-data-time">${ new Intl.DateTimeFormat('default', {
              hour12: true,
              hour: 'numeric',
              minute: 'numeric'
            }).format(new Date(msg.time)) }</span>
        </div>
        <div class="message other-message">${msg.body}</div>
      </li>`)
      $('.chat-history').scrollTop($('.chat-history').prop('scrollHeight'))
    }else
      this.userService.getUser(sId).newIncomingMessageCount++
  }
}

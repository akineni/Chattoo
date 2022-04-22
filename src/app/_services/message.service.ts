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

    this.socketService.socket.on('load', chats => {
      this.load(chats)
    })
  }

  send(): void {

    if($('textarea').val() == '') return

    let msg = {
      body: $('textarea').val().trim(),
      time: new Date()
    }
    
    this.socketService.socket.emit('send', this.userService.currentUser.sId, msg, () => {

      $('.chat-history ul.m-b-0').append(this.sentTemplate(msg.time, msg.body))
      
      $('textarea').val('')
      $('.chat-history').scrollTop($('.chat-history').prop('scrollHeight'))

    })

  }

  private receive(sId: any, msg: any): void {
    if(this.userService.currentUser != undefined && this.userService.currentUser.sId == sId){
      $('.chat-history ul.m-b-0').append(this.receivedTemplate(new Date(msg.time), msg.body))
      $('.chat-history').scrollTop($('.chat-history').prop('scrollHeight'))
    }else
      this.userService.getUser(sId).newIncomingMessageCount++
  }

  private load(chats: any[]): void {
    chats.forEach(c => {

      let history: string = ''

      if(c.from == sessionStorage.getItem('_id'))
        history += this.sentTemplate(new Date(c.time), c.body)
      else
        history += this.receivedTemplate(new Date(c.time), c.body)
      
      $('.chat-history ul.m-b-0').append(history)
      $('.chat-history').scrollTop($('.chat-history').prop('scrollHeight'))


    })
  }

  private sentTemplate(time: any, body: string): string {
    return `<li class="clearfix">
              <div class="message-data text-right">
                  <span class="message-data-time">${ new Intl.DateTimeFormat('default', {
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric'
                  }).format(time) }</span>
              </div>
              <div class="message my-message float-right">${ body }</div>
            </li>`
  }

  private receivedTemplate(time: any, body: string): string {
    return `<li class="clearfix">
              <div class="message-data">
                  <img src="${ this.userService.currentUser.avatar }" alt="avatar">
                  <span class="message-data-time">${ new Intl.DateTimeFormat('default', {
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric'
                  }).format(time) }</span>
              </div>
              <div class="message other-message">${ body }</div>
            </li>`
  }
}

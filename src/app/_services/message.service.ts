import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { UserService } from './user.service';
import * as moment from 'moment';

declare var $:any;

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private transportTime: Date = new Date(Date.now() - 60000)

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

      if(!moment().isSame(this.transportTime, 'minute')) this.transportTime = msg.time

    })

  }

  private receive(sId: any, msg: any): void {
    if(this.userService.currentUser != undefined && this.userService.currentUser.sId == sId){

      $('.chat-history ul.m-b-0').append(this.receivedTemplate(new Date(msg.time), msg.body))
      $('.chat-history').scrollTop($('.chat-history').prop('scrollHeight'))

      if(!moment().isSame(this.transportTime, 'minute')) this.transportTime = msg.time

    }else
      this.userService.getUser(sId).newIncomingMessageCount++
  }

  private load(chats: any[]): void {
    chats.forEach((c, i) => {

      let history: string = '', day = ''

      if(i == 0 || !moment(c.time).isSame(chats[i-1].time, 'day')){
        let d = moment().diff(moment(c.time), 'day')

        if(d == 0 && moment().isSame(c.time, 'day')) day = 'Today'
        else if((d == 0 && !moment().isSame(c.time, 'day')) || d == 1) day = 'Yesterday'
        else if (d < 7) day = moment(c.time).format('dddd')
        else day = moment(c.time).format('dddd, MMMM Do, YYYY')

        history += `<div class="card mx-auto" style="width: 30%">
                      <div class="card-body text-center">${day}</div>
                    </div>`
      }

      if(c.from == sessionStorage.getItem('_id'))
        history += this.sentTemplate(new Date(c.time), c.body)
      else
        history += this.receivedTemplate(new Date(c.time), c.body)
      
      $('.chat-history ul.m-b-0').append(history)
      $('.chat-history').scrollTop($('.chat-history').prop('scrollHeight'))

    })
  }

  private sentTemplate(time: any, body: string): string {
    let template = `<li class="clearfix">
              <div class="message-data text-right">`
              if(!moment().isSame(this.transportTime, 'minute')){
                  template += `<span class="message-data-time">${ new Intl.DateTimeFormat('default', {
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric'
                  }).format(time) }</span>`
                }
              template += `</div>
              <div class="message my-message float-right">${ body }</div>
            </li>`
    return template
  }

  private receivedTemplate(time: any, body: string): string {
    let template = `<li class="clearfix">
              <div class="message-data">
                  <img src="${ this.userService.currentUser.avatar }" alt="avatar">`
                  if(!moment().isSame(this.transportTime, 'minute')){
                    template += `<span class="message-data-time">${ new Intl.DateTimeFormat('default', {
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric'
                    }).format(time) }</span>`
                  }
              template += `</div>
              <div class="message other-message">${ body }</div>
            </li>`
    return template
  }
}

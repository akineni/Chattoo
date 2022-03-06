import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { User } from '../types/User';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Title } from '@angular/platform-browser';

declare var $:any

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io(environment.backend)

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private titleService: Title/*
    private messageService: MessageService*/    
  ) { 
    
    this.socket.on('connect', () => {
      titleService.setTitle(this.socket.id + ': ' + environment.appName)
      this.http.get<string[]>(`${environment.backend}/clients/${this.socket.id}`).subscribe(data => {
        this.userService.users = [...this.userService.users, ...data.map(v => new User(v))]
      })
    })

    this.socket.on('offline', sId => {
      this.userService.users.splice(this.userService.users.indexOf(this.userService.getUser(sId)), 1)
      if(this.userService.currentUser.sId == sId) this.userService.currentUser = undefined
    })

    this.socket.on('online', sId => {
      this.userService.users.push(new User(sId))
    })

    this.socket.on('receive', (sId, msg) => {
      //this.messageService.receive()
      if(this.userService.currentUser != undefined && this.userService.currentUser.sId == sId){
        $('.chat-history ul.m-b-0').append(`
        <li class="clearfix">
          <div class="message-data">
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar">
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
    })
  }
}

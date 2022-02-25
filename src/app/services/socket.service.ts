import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { User } from '../types/User';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io(environment.backend)

  constructor(
    private http: HttpClient,
    private userService: UserService/*,
    private messageService: MessageService*/
  ) { 
    
    this.socket.on('connect', () => {
      this.http.get<Array<User>>(`${environment.backend}/clients/${this.socket.id}`).subscribe(data => {
        this.userService.users = this.userService.users.concat(data)
      })
    })

    this.socket.on('offline', sId => {
      this.userService.users.splice(this.userService.users.indexOf(<User>sId), 1)
      if(this.userService.currentUser == sId) this.userService.currentUser = undefined
    })

    this.socket.on('online', sId => {
      this.userService.users.push(<User>(sId))
    })

    this.socket.on('receive', () => {
      //this.messageService.receive()
      this.http.get(`${environment.backend}/message`).subscribe(data => {
        console.log(data)
      })
    })
  }
}

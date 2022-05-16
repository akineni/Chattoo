import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { User } from '../_types/User';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

declare var $:any

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  /*
    * Setup connection and submit this user's details to the server for access
    * by other users from the server
  */

  socket = io(environment.backend, {
    query: {
      username: sessionStorage.getItem('username'),
      _id: sessionStorage.getItem('_id'),
      avatar: sessionStorage.getItem('avatar')
    },
    autoConnect: false
  })

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { 
    
    this.socket.on('connect', () => {
      this.http.get<any[]>(`${environment.backend}/clients/${this.socket.id}`).subscribe(data => {
        this.userService.users = [...this.userService.users, ...data.map(
          v => new User(v.username, v.sId, v.avatar))]
      })
    })

    this.socket.on('offline', sId => {
      this.userService.users.splice(this.userService.users.indexOf(this.userService.getUser(sId)), 1)
      if(this.userService.currentUser && this.userService.currentUser.sId == sId){
        this.userService.currentUser = undefined
        $('.chat-history ul').empty()
      }
    })

    this.socket.on('online', user => {
      this.userService.users.push(new User(user.username, user.sId, user.avatar))
    })

    /*
      * on receive is set @message.service.ts
    */
  }
}
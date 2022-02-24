import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { User } from '../types/User';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io(environment.backend)

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { 
    
    this.socket.on('connect', () => {
      console.log(this.socket.id)
      this.http.get<Array<User>>(`${environment.backend}/clients`).subscribe(data => {
        (this.userService.users = data).splice(data.findIndex(v => v.sId == this.socket.id, 1))
      })
    })

    this.socket.on('offline', sId => {
      this.userService.users.splice(this.userService.users.indexOf(<User>sId), 1)
      if(this.userService.currentUser == sId) this.userService.currentUser = undefined
    })

    this.socket.on('online', sId => {
      this.userService.users.push(<User>(sId))
    })
  }
}

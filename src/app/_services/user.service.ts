import { Injectable } from '@angular/core';
import { User } from '../_types/User';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any
  users: Array<User> = []

  constructor() { }

  select(event: Event): void {
    $('.chat-list li').removeClass('active')
    $(event.currentTarget).addClass('active')

    this.currentUser = this.users[$(event.currentTarget).index()]
    this.currentUser.newIncomingMessageCount = 0

    $('.chat-history ul').empty()
  }

  getUser(sId: string): User {
    return this.users.filter(v => v.sId == sId)[0]
  }
}

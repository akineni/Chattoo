import { Injectable } from '@angular/core';
import { User } from '../types/User';

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
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterByPipe } from './_pipes/filter-by.pipe';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChatComponent } from './chat/chat.component';
import { CommonModule, TitleCasePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FilterByPipe,
    SignInComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FilterByPipe, TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

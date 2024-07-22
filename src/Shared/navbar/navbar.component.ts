import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from "../../Auth/LoginComponent/login/login.component";
import { AuthService } from '../../Auth/AuthService/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoginComponent,
    NgIf
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  isLogged! : WritableSignal<boolean>
  email : string | null = localStorage.getItem("Email");

constructor(
  public authService : AuthService,
  private router : Router
){
  this.isLogged = authService.isLogged
}

logout(){
    this.authService.logout();
    this.email = null;

  }
}

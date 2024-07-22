import { Component, Input } from '@angular/core';
import {  FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../../Models/LoginModel/login.model';
import { AuthService } from '../../AuthService/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  group: FormGroup;

  constructor(
    private authService : AuthService,
    private router: Router, 
    private _fb: FormBuilder
  ){
    this.group = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]]
  })

}

  onSubmit(e : Event){
    e.preventDefault();
    let login : Login = {
      email : this.group.value["username"],
      password : this.group.value["password"]
    }
      if (this.group.valid) {
      
        this.authService.Login(login);
        this.router.navigate(['http://localhost:4200/'])
      }
  }
  
}

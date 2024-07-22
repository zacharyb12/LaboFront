import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../AuthService/auth.service';
import { Register } from '../../../Models/LoginModel/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
group : FormGroup;

constructor(
  private formBuilder : FormBuilder,
  private authService : AuthService,
  private router : Router
){
  this.group = this.formBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
    passwordConfirm : [null, [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')]]

  })
  
}

Register(){
  let register : Register = {
    nickname : this.group.value["name"],
    email : this.group.value["email"],
    password : this.group.value["password"],
    passwordConfirm : this.group.value["passwordConfirm"],

  }
  if(this.group.valid){
  
    this.authService.Register(register)
    this.router.navigateByUrl('/')
  }
}
}

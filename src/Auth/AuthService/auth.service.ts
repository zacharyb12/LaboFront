import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Login } from '../../Models/LoginModel/login.model';
import * as jwt_decode from 'jwt-decode';
import { Register } from '../../Models/LoginModel/register.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id : WritableSignal<number> = signal(-1);
  role : WritableSignal<string> = signal('');
  email : WritableSignal<string> = signal('');
  token : WritableSignal<string> = signal('');


  isLogged: WritableSignal<boolean> = signal(this.isToken);

  get isToken() : boolean {
    return localStorage.getItem("token") != undefined
  }

  constructor(
    private httpClient : HttpClient,
    private router : Router
  ) {

   }


   clearSignal(){
    this.role = signal("");
    this.email = signal("");
    this.token = signal("");
    this.isLogged.set(this.isToken);
   }

  getUserId(token : any) {
    const decodedToken : any = jwt_decode.jwtDecode(token);
    if (decodedToken) {
      localStorage.setItem("Id",decodedToken["UserId"]);
      this.id.set(decodedToken["UserId"])
    }
  }

  getUserRole(token : any) {
    const decodedToken : any = jwt_decode.jwtDecode(token);
    if (decodedToken) {
      localStorage.setItem("Role",decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      this.role.set(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
    }
  }

  getUserEmail(token : any) {
    const decodedToken : any = jwt_decode.jwtDecode(token);
    if (decodedToken) {
      localStorage.setItem("Email",decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
      this.email.set(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
    }
  }

  isTokenValid(token : any): boolean{
    const decoded: any = jwt_decode.jwtDecode(token);
    const exp = decoded.exp;
    const currentTime1 =  (new Date(exp)).getTime() < (new Date()).getTime()
    return currentTime1;
  }

  getTokenvalidity(token : any) {
    const decodedToken : any = jwt_decode.jwtDecode(token);
    if (decodedToken) {
      const exp = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if(exp > currentTime){
        localStorage.setItem("Validity",decodedToken["exp"]);
      }else{
        localStorage.clear();
      }

    }
  }

  Register(registerForm : Register){

    this.httpClient.post('http://tfcybersecu.somee.com/api/Auth/register',registerForm).subscribe({
      next: (response) => {
        this.router.navigate(['']);
        
      }
    })
}

  Login(loginForm : Login){
    this.httpClient.post('http://tfcybersecu.somee.com/api/Auth/login', loginForm, { responseType: 'text' }).subscribe({
      next: (token) => {
        localStorage.setItem("token",token);
        this.isLogged.set(this.isToken);
        this.token.set(token);

        this.getUserId(token);
        this.getUserRole(token);
        this.getTokenvalidity(token);
        this.getUserEmail(token);
        
        this.router.navigate(['']);
        
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
}

  logout(){
    localStorage.clear();
    this.clearSignal();
    this.router.navigate(['/']);
  }
  
}
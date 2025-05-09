import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup
  formState:string =  'sign in'
  constructor(private auth: AuthService,private formBuilder: FormBuilder,private router:Router){
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })
  }
  onSubmit(): void{
    if(this.formState == 'sign in'){
      this.auth.login(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value).then(()=>{
        this.router.navigate([''])
      }).catch(err=>alert(err))
    }else{
      this.auth.register(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value).then(()=>{
        this.router.navigate([''])
      }).catch(err=>alert(err))
    }
  }
  googleLogin(){
    this.auth.googleLogin().then(()=>{
      this.router.navigate([''])
    }).catch(err=>alert(err))
  }
  register(){
    this.formState = 'sign up'
  }
}

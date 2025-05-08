import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth: AuthService,private router:Router){}
  logout(): void{
    this.auth.logOut().then(()=>{
      this.router.navigate([''])
    })
  }
}

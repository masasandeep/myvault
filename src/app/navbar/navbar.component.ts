import { Component, EventEmitter, Output, output } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() search = new EventEmitter<string>()
  constructor(private auth: AuthService,private router:Router){}
  logout(): void{
    this.auth.logOut().then(()=>{
      this.router.navigate([''])
    })
  }
  onChange(event:Event){
    const value = (event.target as HTMLInputElement).value
    this.search.emit(value.trim())
  }
}

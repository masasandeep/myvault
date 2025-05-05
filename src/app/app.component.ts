import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewsitesComponent } from './viewsites/viewsites.component';

@Component({
  selector: 'app-root',
  imports: [ViewsitesComponent,NavbarComponent,RouterModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myvault';
}

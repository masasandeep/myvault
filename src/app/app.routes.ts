import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewsitesComponent } from './viewsites/viewsites.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component:ViewsitesComponent,
        canActivate: [authGuard]
    },{
        path: 'passwordList/:id',
        component: PasswordListComponent,
        canActivate: [authGuard]
    }
];

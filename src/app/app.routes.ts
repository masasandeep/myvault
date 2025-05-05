import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewsitesComponent } from './viewsites/viewsites.component';
import { PasswordListComponent } from './password-list/password-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'siteList',
        component:ViewsitesComponent
    },{
        path: 'password-list',
        component: PasswordListComponent
    }
];

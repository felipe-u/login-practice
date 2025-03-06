import { Routes } from "@angular/router";
import { routes as AuthRoutes } from "./auth/auth.routes";
import { HomeComponent } from "./shared/home/home.component";
import { RocketsComponent } from "./features/rockets/rockets.component";
import { ContactComponent } from "./features/contact/contact.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        children: AuthRoutes
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'rockets',
                component: RocketsComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            }
        ]
    }
]
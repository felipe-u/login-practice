import { Routes } from "@angular/router";
import { routes as AuthRoutes} from "./auth/auth.routes";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        children: AuthRoutes
    }
]
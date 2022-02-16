import { Routes } from '@angular/router';
import { HostComponent } from './host/host.component';
import { JoinComponent } from './join/join.component';
import { PlayComponent } from './play/play.component';
import { AboutComponent } from './about/about.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: '/host', pathMatch: 'full' },
    { path: 'host', component: HostComponent },
    { path: 'join', component: JoinComponent },
    { path: 'play', component: PlayComponent },
    { path: 'about', component: AboutComponent }
];
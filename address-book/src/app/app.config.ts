import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles/profiles.component';

export const routes: Routes = [
  { path: '', redirectTo: 'profiles', pathMatch: 'full' },
  { path: 'profiles', component: ProfilesComponent }
];

export const appConfig = {
  providers: [provideRouter(routes)],
};

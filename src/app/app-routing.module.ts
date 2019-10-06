import { NoteOverviewComponent } from './note-overview/note-overview.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SynchronizationComponent } from './synchronization/synchronization.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview/ToDos',
    pathMatch: 'full'
  },
  {
    path: 'overview/:space',
    component: NoteOverviewComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'sync',
    component: SynchronizationComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

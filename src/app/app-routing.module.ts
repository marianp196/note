import { NoteOverviewComponent } from './note-overview/note-overview.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SynchronizationComponent } from './synchronization/synchronization.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: NoteOverviewComponent,
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

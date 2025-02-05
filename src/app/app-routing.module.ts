import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorComponent } from './pages/error/error.component';
import { GameComponent } from './pages/game/game.component';
import { TutoComponent } from './pages/tuto/tuto.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'tuto', component: TutoComponent },
  { path: 'game/:gameId', component: GameComponent},
  { path: '**', component: ErrorComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

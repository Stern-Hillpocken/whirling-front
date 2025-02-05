import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { GameCreationComponent } from './components/landing/game-creation/game-creation.component';
import { GameComponent } from './pages/game/game.component';
import { ErrorComponent } from './pages/error/error.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TutoComponent } from './pages/tuto/tuto.component';
import { GameListComponent } from './components/landing/game-list/game-list.component';
import { ChatComponent } from './components/shared/chat/chat.component';
import { TipComponent } from './components/shared/tip/tip.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { SvgComponent } from './components/shared/svg/svg.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    GameCreationComponent,
    GameComponent,
    ErrorComponent,
    TutoComponent,
    GameListComponent,
    ChatComponent,
    TipComponent,
    MenuComponent,
    SvgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

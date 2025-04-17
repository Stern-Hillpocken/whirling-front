import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { GameCreationComponent } from './components/landing/game-creation/game-creation.component';
import { GameComponent } from './pages/game/game.component';
import { ErrorComponent } from './pages/error/error.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TutoComponent } from './pages/tuto/tuto.component';
import { GameListComponent } from './components/landing/game-list/game-list.component';
import { ChatComponent } from './components/shared/chat/chat.component';
import { TipComponent } from './components/shared/tip/tip.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { SvgComponent } from './components/shared/svg/svg.component';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { gameReducer } from './store/game.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { updateUserNameSuccess$, createGameSuccess$, postUpdateUserName$, postCreateGame$, postMessageGlobal$, postMessageIngame$, postRegister$, gatherGame$, gatherGameSuccess$, gatherUserIndex$ } from './store/game.effects';
import { TokenInterceptor } from './core/token.interceptor';
import { HubComponent } from "./components/game/hub/hub.component";
import { SetupComponent } from "./components/game/setup/setup.component";
import { BoardComponent } from './components/game/board/board.component';
import { ChooseRecipeComponent } from './components/game/choose-recipe/choose-recipe.component';
import { ProduceIngredientsComponent } from './components/game/produce-ingredients/produce-ingredients.component';
import { NeighbourhoodMenuComponent } from "./components/game/neighbourhood-menu/neighbourhood-menu.component";
import { RecipeComponent } from "./components/shared/recipe/recipe.component";
import { HandComponent } from "./components/game/skills/skills.component";

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
    SvgComponent,
    HubComponent,
    SetupComponent,
    BoardComponent,
    ChooseRecipeComponent,
    ProduceIngredientsComponent,
    NeighbourhoodMenuComponent,
    RecipeComponent,
    HandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideStore({ game: gameReducer}),
    provideState('appli', gameReducer),
    provideEffects({
      postRegister$,
      postMessageGlobal$,
      postMessageIngame$,
      postCreateGame$,
      createGameSuccess$,
      postUpdateUserName$,
      updateUserNameSuccess$,
      gatherGame$,
      gatherGameSuccess$,
      gatherUserIndex$,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Game } from "./game.model";

export interface ApplicationState {
    userId: string,
    userName: string,
    gameId: string,
    game: Game
}
import { Phase } from "../types/phase.type";

export class Game {
    constructor(
        public id: string,
        public password: string,
        public ownerName: string,
        public date: number,
        public isStarted: boolean,
        public playersName: string[],
        public currentPhase: Phase,
        public areReady: boolean[]
    ){}
}
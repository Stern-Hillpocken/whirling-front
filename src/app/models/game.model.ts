export class Game {
    constructor(
        public id: string,
        public password: string,
        public ownerName: string,
        public date: number,
        public playersName: string[]
    ){}
}
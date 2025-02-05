export class MessageReceived {
    constructor(
        public user: string,
        public content: string,
        public date: number
    ) {}
}
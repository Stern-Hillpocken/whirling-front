import { Identification } from "./identification.model";

export class MessageSended {
    constructor(
        public identification: Identification,
        public content: string
    ){}
}
import { Identification } from "./identification.model";

export class IdentificationToUpdate {
    constructor(
        public identification: Identification,
        public newUserName: string
    ){}
}
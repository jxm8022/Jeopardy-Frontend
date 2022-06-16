import { IAnswer } from "./IAnswer";

export class Answer implements IAnswer {
    constructor(
        public Id: number,
        public Entry: string,
        public Question_id: number
    ) { }
}
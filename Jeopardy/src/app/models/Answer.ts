import { IAnswer } from "./IAnswer";

export class Answer implements IAnswer {
    constructor(
        public ID: number,
        public Entry: string,
        public Question_ID: number
    ) { }
}
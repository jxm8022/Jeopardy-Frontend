import { IAnswer } from "./IAnswer";

export class Answer implements IAnswer {
    constructor(
        public answer_id: number,
        public answer_entry: string,
        public question_id: number
    ) { }
}
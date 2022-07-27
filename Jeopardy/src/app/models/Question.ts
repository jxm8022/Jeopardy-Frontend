import { IQuestion } from "./IQuestion";

export class Question implements IQuestion {
    constructor(
        public question_id: number,
        public question_entry: string,
        public category_id: number
    ) { }
}
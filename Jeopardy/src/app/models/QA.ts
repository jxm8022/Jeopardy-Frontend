import { Answer } from "./Answer";
import { IQA } from "./IQA";
import { Question } from "./Question";

export class QA implements IQA {
    constructor(
        public Question: Question,
        public Answer: Answer
    ) { }
}
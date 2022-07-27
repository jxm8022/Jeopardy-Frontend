import { Answer } from "./Answer";
import { IQA } from "./IQA";
import { Question } from "./Question";

export class QA implements IQA {
    constructor(
        public question: Question,
        public answer: Answer
    ) { }
}
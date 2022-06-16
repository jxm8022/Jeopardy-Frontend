import { IQuestion } from "./IQuestion";

export class Question implements IQuestion {
    constructor(
        public ID: number,
        public Entry: string,
        public Type_ID: number
    ) { }
}
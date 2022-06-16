import { IQuestion } from "./IQuestion";

export class Question implements IQuestion {
    constructor(
        public Id: number,
        public Entry: string,
        public Type_id: number
    ) { }
}
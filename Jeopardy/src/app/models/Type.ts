import { IType } from "./IType";

export class Type implements IType {
    constructor(
        public Id: number,
        public Category: string
    ) { }
}
import { IType } from "./IType";

export class Type implements IType {
    constructor(
        public ID: number,
        public Category: string
    ) { }
}
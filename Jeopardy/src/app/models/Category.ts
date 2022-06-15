import { ICategory } from "./ICategory";

export class Category implements ICategory {
    constructor(
        public ID: number,
        public Category: string
    ) { }
}
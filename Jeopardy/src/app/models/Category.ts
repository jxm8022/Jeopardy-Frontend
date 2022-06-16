import { ICategory } from "./ICategory";

export class Category implements ICategory {
    constructor(
        public Id: number,
        public Category: string
    ) { }
}
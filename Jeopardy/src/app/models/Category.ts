import { ICategory } from "./ICategory";

export class Category implements ICategory {
    constructor(
        public category_id: number,
        public category_name: string
    ) { }
}
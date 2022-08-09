import { ISubCategory } from "./ISubCategory";

export class SubCategory implements ISubCategory {
    constructor(
        public subcategory_id: number,
        public subcategory_name: string,
        public category_id: number
    ) { }
}
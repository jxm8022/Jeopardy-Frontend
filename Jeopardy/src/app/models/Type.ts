import { Category } from "./Category";
import { IType } from "./IType";
import { SubCategory } from "./SubCategory";

export class Type implements IType {
    constructor(
        public category: Category,
        public subcategories: SubCategory[]
    ) { }
}
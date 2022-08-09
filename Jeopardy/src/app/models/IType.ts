import { Category } from "./Category";
import { SubCategory } from "./SubCategory";

export interface IType {
    category: Category,
    subcategories: SubCategory[]
}
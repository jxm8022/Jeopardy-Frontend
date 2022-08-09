import { IAdmin } from "./IAdmin";

export class Admin implements IAdmin {
    constructor(
        public admin_id: number,
        public admin_name: string,
        public admin_password: string,
        public admin_access: number
    ) { }
}
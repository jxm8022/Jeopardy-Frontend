import { ITeam } from "./ITeam";

export class Team implements ITeam {
    constructor(
        public Id: number,
        public Name: string,
        public Score: number
    ) { }
}
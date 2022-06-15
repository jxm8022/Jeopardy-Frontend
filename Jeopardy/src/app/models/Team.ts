import { ITeam } from "./ITeam";

export class Team implements ITeam {
    constructor(
        public ID: number,
        public Name: string,
        public Score: number
    ) { }
}
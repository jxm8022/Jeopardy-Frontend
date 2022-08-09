import { ITeam } from "./ITeam";

export class Team implements ITeam {
    constructor(
        public team_id: number,
        public team_name: string,
        public team_score: number
    ) { }
}